import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import download from "image-downloader";
import path from "path";
import Place from "../models/placeModel.js";
import Booking from "../models/bookingModel.js";

const __dirname = path.resolve();

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;
  try {
    const bcryptedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      name,
      email,
      password: bcryptedPassword,
    });
    delete user.password;
    res.status(201).json({
      user,
      message: "Registered Successfully",
    });
  } catch (error) {
    res.status(422).json({
      message: "Email is already used",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not exist",
      });
    }
    const validatedPassword = await bcrypt.compare(password, user.password);
    if (!validatedPassword) {
      return res.status(404).json({
        message: "Password is wrong..",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "2d",
      }
    );
    delete user.password;
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).json({
      message: "Login successful.",
      user,
      token,
    });
  } catch (error) {
    res.status(422).json({
      message: "Something went wrong..",
    });
  }
};

export const profile = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
        if (err) throw err;
        const { name, email, _id } = await User.findById(userData._id);
        res.json({ name, email, _id });
      });
    } else {
      res.json(null);
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Handle token expiration error
      console.log("JWT has expired");
      return res.status(401).json({ error: "JWT has expired" });
    } else {
      // Handle other JWT verification errors
      console.error("JWT verification failed:", error.message);
      return res.status(500).json({ error: "JWT verification failed" });
    }
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "").json(true);
  } catch (e) {
    res.json(e);
  }
};

export const photolink = async (req, res) => {
  try {
    const { photoLink } = req.body;
    const newName = "photo" + Date.now() + ".jpg";

    const options = {
      url: photoLink,
      dest: __dirname + "/uploads/" + newName,
    };

    const { filename } = await download.image(options);
    res.status(200).json({ newName, filename });
  } catch (error) {
    res.status(422).json(error);
  }
};

export const addPlace = async (req, res) => {
  try {
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;
    const { token } = req.cookies;
    if (token) {
      await jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        const placeDoc = await Place.create({
          owner: decoded._id,
          title: title,
          address: address,
          photos: addedPhotos,
          description: description,
          perks: perks,
          extraInfo: extraInfo,
          checkIn: checkIn,
          checkOut: checkOut,
          maxGuests: maxGuests,
          price: price,
        });
        res.status(201).json(placeDoc);
      });
    }
  } catch (error) {
    console.error("Error in addPlace:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPlace = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      await jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        const places = await Place.find({ owner: decoded._id });
        res.status(201).json(places);
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPlaceById = async (req, res) => {
  try {
    const { id } = req.params;
    const placeDoc = await Place.findById(id);
    res.status(201).json(placeDoc);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePlace = async (req, res) => {
  try {
    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;
    const { token } = req.cookies;
    const placeDoc = await Place.findById(id);

    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (decoded._id === placeDoc.owner.toString()) {
          placeDoc.set({
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
          });
          placeDoc.save();
          res.status(201).json(placeDoc);
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllPlaces = async (req, res) => {
  try {
    const placesDoc = await Place.find();
    res.json(placesDoc);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const singlePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const placeDoc = await Place.findById(id);
    res.status(201).json(placeDoc);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const bookPlace = (req, res) => {
  try {
    const {
      place,
      checkIn,
      checkOut,
      guests,
      name,
      phone,
      numberOfNights,
      totalPrice,
    } = req.body;
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, async (err, userData) => {
        const bookingDoc = await Booking.create({
          user: userData._id,
          place,
          checkIn,
          checkOut,
          guests,
          name,
          phone,
          numberOfNights,
          totalPrice,
        });
        res.status(201).json(bookingDoc);
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const bookedPlaces = (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, async (err, userData) => {
        const bookingsDoc = await Booking.find({ user: userData._id }).populate(
          "place"
        );
        res.status(200).json(bookingsDoc);
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const bookedPlace = async (req,res) =>{
  try {
    const {id} = req.params
    const {token} =req.cookies
    if(token){
      jwt.verify(token,process.env.SECRET_KEY,async(err,userData)=>{
        const BookedPlaceDoc=  await Booking.findById(id).populate('place')
        res.status(200).json(BookedPlaceDoc)
      })
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });

  }
}