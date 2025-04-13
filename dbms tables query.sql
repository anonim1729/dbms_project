create database edtech;
use edtech;

CREATE TABLE users (
  email VARCHAR(100) NOT NULL,
  f_name VARCHAR(50) NOT NULL,
  m_name VARCHAR(50),
  l_name VARCHAR(50) NOT NULL,
  ph_no VARCHAR(10) UNIQUE NOT NULL,
  account_type ENUM('admin','instructor','student') NOT NULL,
  dob DATE,
  gender ENUM('male','female','other') NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (email)
);

CREATE TABLE categories (
  category_name VARCHAR(100) NOT NULL,
  admin_email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (category_name),
  FOREIGN KEY (admin_email) REFERENCES users(email) ON DELETE SET NULL
);

CREATE TABLE courses (
  course_id INT AUTO_INCREMENT NOT NULL,
  course_name VARCHAR(255) NOT NULL,
  description TEXT,
  instructor_email VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  category_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (course_id),
  FOREIGN KEY (instructor_email) REFERENCES users(email) ON DELETE CASCADE,
  FOREIGN KEY (category_name) REFERENCES categories(category_name) ON DELETE CASCADE
);

CREATE TABLE enrollment (
  email VARCHAR(100) NOT NULL,
  course_id INT NOT NULL,
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (email, course_id),
  FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);

CREATE TABLE course_videos (
  video_url VARCHAR(500) NOT NULL,
  course_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration INT NOT NULL, 
  PRIMARY KEY (video_url),
  FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);

ALTER TABLE courses 
ADD COLUMN thumbnail VARCHAR(500) NOT NULL 
DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm-9Im2xfbNlD7kyL5oVvbx6ILunKeGy0GRw&s';

CREATE TABLE ratings_reviews (
  course_id INT NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  rating INT CHECK (rating >= 0 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (course_id, user_email),
  FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
  FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
);

-- triggers
DELIMITER $$

CREATE TRIGGER format_user_name
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
  SET NEW.f_name = CONCAT(UCASE(LEFT(NEW.f_name, 1)), LCASE(SUBSTRING(NEW.f_name, 2)));
  
  IF NEW.m_name IS NOT NULL THEN
    SET NEW.m_name = CONCAT(UCASE(LEFT(NEW.m_name, 1)), LCASE(SUBSTRING(NEW.m_name, 2)));
  END IF;

  SET NEW.l_name = CONCAT(UCASE(LEFT(NEW.l_name, 1)), LCASE(SUBSTRING(NEW.l_name, 2)));
END$$

DELIMITER ;

-- procedures
DELIMITER $$

CREATE PROCEDURE get_courses_with_aggregates(IN p_user_email VARCHAR(100))
BEGIN
  SELECT 
    c.*,
    AVG(r.rating) AS average_rating,
    COUNT(DISTINCT r.user_email) AS rating_count,
    COUNT(DISTINCT cv.video_url) AS video_count,
    COUNT(DISTINCT e.email) AS enrolled_count
  FROM courses c
  LEFT JOIN ratings_reviews r ON c.course_id = r.course_id
  LEFT JOIN course_videos cv ON c.course_id = cv.course_id
  LEFT JOIN enrollment e ON c.course_id = e.course_id
  GROUP BY c.course_id;
END$$

DELIMITER ;

