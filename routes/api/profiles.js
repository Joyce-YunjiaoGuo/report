// login and register
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/Profile');

const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

// post /api/profiles/addOne
// @desc 添加一条
// @access public
router.post('/addOne', passport.authenticate('jwt', {session: false}), (req, res) => {
    const date = req.body.date;
    Profile.find({ date, userId: req.user._id })
      .then(profile => {
        console.log(profile, 'profile');
        if (profile.length > 0) {
          res.json({ msg: '已经填写过该日期的日报！' });
        } else {
          const profileObj = {};
          if (Object.keys(req.body).length > 0) {
            Object.keys(req.body).forEach(ele => {
              profileObj[ele] = req.body[ele];
            })
          }
          profileObj.date = new Date(req.body.date);
          Profile(profileObj).save()
            .then(profile => res.json(profile))
            .catch(err => console.log(err));
        }
      })
    
})

// post /api/profiles/add
// @desc 添加多条--批量
// @access public
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
    const start  = moment(req.body.date[0]);
    const end    = moment(req.body.date[1]);
    const range1 = moment.range(start, end);
    let acc = Array.from(range1.by('day')).map(m => m.format('YYYY-MM-DD'));
    acc.forEach(ele => {
        Profile.find({ date: ele, userId: req.user._id })
          .then(profile => {
            console.log(profile);
            if (profile.length > 0) {
              const profileObj = {};
              if (Object.keys(req.body).length > 0) {
                Object.keys(req.body).forEach(ele => {
                  profileObj[ele] = req.body[ele];
                })
              }
              profileObj.date = new Date(ele);
              Profile.findOneAndUpdate(
                { _id: profile[0].id },
                { $set: profileObj },
                { new: true },
              )
                .then(profile => res.json(profile))
                .catch(err => console.log(err));
            } else {
              const profileObj = {};
              if (Object.keys(req.body).length > 0) {
                Object.keys(req.body).forEach(ele => {
                  profileObj[ele] = req.body[ele];
                })
              }
              profileObj.date = new Date(ele);
              Profile(profileObj).save()
               .then(profile => res.json(profile))
               .catch(err => console.log(err));
            }
          })
    });
})

// get /api/profiles
// @desc 查找全部
// @access public
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.find({userId: req.user._id})
        .then(profile => {
            if (!profile) {
                res.json({ msg: '暂无数据'});
            }
            res.json(profile)
        })
        .catch(err => console.log(err));
})

// get /api/profiles/id
// @desc 查找单条
// @access public
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({ _id: req.params.id })
        .then(profile => {
            if (!profile) {
                res.json({ msg: '暂无数据'});
            }
            res.json(profile)
        })
        .catch(err => console.log(err));
})

// post /api/profiles/edit/id
// @desc 编辑
// @access public
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const profileObj = {};
    if (Object.keys(req.body).length > 0) {
        Object.keys(req.body).forEach(ele => {
            profileObj[ele] = req.body[ele];
        })
    }
    Profile.findOneAndUpdate(
        { _id: req.params.id },
        { $set: profileObj },
        { new: true },
    )
        .then(profile => res.json(profile))
        .catch(err => console.log(err));
})

// delete /api/profiles/delete/id
// @desc 删除
// @access public
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOneAndRemove({ _id: req.params.id })
        .then(profile => res.json(profile))
        .catch(err => console.log(err));
})

// get /api/profiles/search
// @desc 查找
// @access public
router.post('/search', passport.authenticate('jwt', {session: false}), (req, res) => {
    const start = new Date(req.body.searchDate[0]);
    const end = new Date(req.body.searchDate[1]);
    console.log(start, end);
    Profile.find({date:{$gte: start, $lte: end}, userId: req.user._id})
      .then(profile => {
        console.log(profile, 'profile')
        res.json(profile);
      })
})


module.exports = router;