const { ObjectId } = require('mongoose').Types;
const { Networker, Homie } = require('../models');


const networkerCount = async () => {
  const numberOfNetworkers = await Networker.aggregate()
    .count('networkerCount');
  return numberOfNetworkers;
}

// // Aggregate function for getting the overall grade using $avg
// const grade = async (studentId) =>
//   Student.aggregate([
//     // only include the given student by using $match
//     { $match: { _id: new ObjectId(studentId) } },
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: {
//         _id: new ObjectId(studentId),
//         overallGrade: { $avg: '$assignments.score' },
//       },
//     },
//   ]);

module.exports = {
  async getNetworkers(req, res) {
    try {
      const networkers = await Networker.find();

      const networkerObj = {
        networkers,
        networkerCount: await networkerCount(),
      };

      res.json(networkerObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  
  async getSingleNetworker(req, res) {
    try {
      const networker = await Networker.findOne({ _id: req.params.networkerId })
        .select('-__v');

      if (!networker) {
        return res.status(404).json({ message: 'No Networker with that ID' })
      }

      res.json({
        networker
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
 
  async createNetworker(req, res) {
    try {
      const networker= await Networker.create(req.body);
      res.json(networker);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async deleteNetworker(req, res) {
    try {
      const networker = await Networker.findOneAndRemove({ _id: req.params.networkerId });

      if (!networker) {
        return res.status(404).json({ message: 'No such Networker exists' });
      }

      const homie = await Homie.findOneAndUpdate(
        { networkers: req.params.networkerId },
        { $pull: { networkers: req.params.networkerId } },
        { new: true }
      );

      if (!homie) {
        return res.status(404).json({
          message: 'Networker deleted, but no Homies found',
        });
      }

      res.json({ message: 'Networker successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  
  async addIdea(req, res) {
    console.log('You are adding an idea');
    console.log(req.body);

    try {
      const networker = await Networker.findOneAndUpdate(
        { _id: req.params.networkerId },
        { $addToSet: { ideas: req.body } },
        { runValidators: true, new: true }
      );

      if (!networker) {
        return res
          .status(404)
          .json({ message: 'No Networker found with that ID :(' });
      }

      res.json(networker);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async removeIdea(req, res) {
    try {
      const networker = await Networker.findOneAndUpdate(
        { _id: req.params.networkerId },
        { $pull: { idea: { ideaId: req.params.ideaId } } },
        { runValidators: true, new: true }
      );

      if (!networker) {
        return res
          .status(404)
          .json({ message: 'No Networker found with that ID :(' });
      }

      res.json(networker);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};