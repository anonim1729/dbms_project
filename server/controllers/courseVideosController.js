const db = require('../config/db');

exports.addVideo = (req, res) => {
  const { video_url, course_id, title, description, duration } = req.body;

  if (!video_url || !course_id || !title || !duration) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.query(
    'INSERT INTO course_videos (video_url, course_id, title, description, duration) VALUES (?, ?, ?, ?, ?)',
    [video_url, course_id, title, description, duration],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Video added successfully' });
    }
  );
};

exports.updateVideo = (req, res) => {
  const { video_url, title, description, duration } = req.body;

  if (!video_url || !title || !duration) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.query(
    'UPDATE course_videos SET title = ?, description = ?, duration = ? WHERE video_url = ?',
    [title, description, duration, video_url],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Video not found' });
      res.json({ message: 'Video updated successfully' });
    }
  );
};

exports.getVideosByCourse = (req, res) => {
  const { course_id } = req.params;

  db.query('SELECT * FROM course_videos WHERE course_id = ?', [course_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.deleteVideo = (req, res) => {
  const { video_url } = req.body;

  if (!video_url) {
    return res.status(400).json({ error: 'Missing video_url' });
  }

  db.query('DELETE FROM course_videos WHERE video_url = ?', [video_url], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Video not found' });
    res.json({ message: 'Video deleted successfully' });
  });
};
