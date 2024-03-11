const { Homie, Networker } = require('../models');

module.exports = {
  async getHomies(req, res) {
    try {
      const homies = await Homie.find();
      res.json(homies);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async getSingleHomie(req, res) {
    try {
      const homie = await Homie.findOne({ _id: req.params.homieId })
        .select('-__v');

      if (!homie) {
        return res.status(404).json({ message: 'No Homie with that ID' });
      }

      res.json(homie);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async createHomie(req, res) {
    try {
      const homie = await Homie.create(req.body);
      res.json(homie);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  
  async deleteHomie(req, res) {
    try {
      const homie = await Homie.findOneAndDelete({ _id: req.params.homieId });

      if (!homie) {
        res.status(404).json({ message: 'No Homie with that ID' });
      }

      await Networker.deleteMany({ _id: { $in: homie.networkers } });
      res.json({ message: 'Homie and Networkers deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async updateHomie(req, res) {
    try {
      const homie = await Homie.findOneAndUpdate(
        { _id: req.params.homieId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!homie) {
        res.status(404).json({ message: 'No Homie with this id!' });
      }

      res.json(homie);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};