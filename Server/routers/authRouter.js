import express from "express";
import {
  login,
  register,
  profile,
  logout,
  photolink,
  addPlace,
  getPlace,
  getPlaceById,
  updatePlace,
  getAllPlaces,
  singlePlace,
  bookPlace,
  bookedPlaces,
} from "../controllers/auth.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", profile);
router.post("/photolink", photolink);
router.post("/place", addPlace);
router.get("/place", getPlace);
router.get("/place/:id", singlePlace);
router.get("/allplaces", getAllPlaces);
router.get("/place/:id", getPlaceById);
router.post("/book-place" ,bookPlace)
router.get("/booked-places" ,bookedPlaces)
router.put("/place", updatePlace);

export default router;
