const Offers = require("../models/Offers");
const Pitches = require("../models/Pitches");

const getAllPitches = async (req, res) => {
  try {
    const pitches = await Pitches.aggregate([
      {
        $addFields: { id: { $toString: "$_id" } },
      },
      {
        $unset: ["__v", "created_at", "offers.__v", "_id"],
      },
      {
        $sort: { created_at: 1 },
      },
    ]);
    res.status(200).json(pitches);
  } catch (error) {
    res.status(400).json({ msg: "Invalid Request Body" });
  }
};

const deleteAllPitch = async (req, res) => {
  try {
    await Pitches.deleteMany();
    res.status(200).json({});
  } catch (error) {
    res.status(400).json({ msg: "Invalid Request Body" });
  }
};

const createPitches = async (req, res) => {
  try {
    const pitches = await Pitches.create(req.body);

    res.status(201).json({ id: pitches._id });
  } catch (error) {
    res.status(400).json({ msg: "Invalid Request Body" });
  }
};

const getPitch = async (req, res) => {
  try {
    const { id: pitchesID } = req.params;
    const pitches = await Pitches.findOne({ _id: pitchesID })
      .select("-__v -created_at -offers.__v")
      .lean();
    pitches.id = pitches._id;

    pitches.offers.forEach((offer) => {
      offer.id = offer._id;
      delete offer["_id"];
    });

    delete pitches["_id"];
    if (!pitches) {
      return res.status(404).json({ msg: `NO Pitch: ${pitchesID}` });
    }
    res.status(200).json(pitches);
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

const updatePitches = async (req, res) => {
  const pitch = await Pitches.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .select("-__v -created_at")
    .lean();

  res.status(200).json(pitch);
};

const deletePitches = async (req, res) => {
  await Pitches.deleteOne({ _id: req.params.id });
  res.send("delete pitches");
};

const counterOffer = async (req, res) => {
  try {
    const pitch_id = req.params.id;
    let pitch = await Pitches.findById(pitch_id);

    if (!pitch) {
      return res.status(404).send("Pitch Not Found");
    }

    const upcomingOffer = await Offers.create(req.body);
    pitch.offers.push(upcomingOffer);
    await pitch.save();

    const obj = pitch.toObject();

    delete obj["__v"];
    delete obj["created_at"];

    obj.offers.forEach((offer) => delete offer["__v"]);

    res.status(201).json({ id: pitch._id });
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid Request Body");
  }
};
module.exports = {
  getAllPitches,
  createPitches,
  getPitch,
  deletePitches,
  updatePitches,
  counterOffer,
  deleteAllPitch,
};
