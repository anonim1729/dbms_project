use edtech;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE ratings_reviews;
TRUNCATE TABLE course_videos;
TRUNCATE TABLE enrollment;
TRUNCATE TABLE courses;
TRUNCATE TABLE categories;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- Users
INSERT INTO users (email, f_name, l_name, ph_no, account_type, dob, gender, password) VALUES
('admin@edtech.com', 'Admin', 'User', '9876543210', 'admin', '1980-01-01', 'male', 'password'),
('instructor1@edtech.com', 'John', 'Doe', '9876543211', 'instructor', '1985-05-15', 'male', 'password'),
('instructor2@edtech.com', 'Jane', 'Smith', '9876543212', 'instructor', '1990-08-22', 'female', 'password'),
('student1@edtech.com', 'Mike', 'Johnson', '9876543213', 'student', '2000-02-10', 'male', 'password'),
('student2@edtech.com', 'Emma', 'Davis', '9876543214', 'student', '2001-03-25', 'female', 'password'),
('student3@edtech.com', 'David', 'Brown', '9876543215', 'student', '1999-11-05', 'male', 'password'),
('student4@edtech.com', 'Sophia', 'Miller', '9876543216', 'student', '2002-07-18', 'female', 'password');

-- Categories
INSERT INTO categories (category_name, admin_email) VALUES
('Programming', 'admin@edtech.com'),
('Mathematics', 'admin@edtech.com'),
('Web Development', 'admin@edtech.com');

-- Courses (with working thumbnail URLs)
INSERT INTO courses (course_name, description, instructor_email, category_name, thumbnail) VALUES
('Python Programming', 'Learn Python from scratch', 'instructor1@edtech.com', 'Programming', 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
('Linear Algebra', 'Master linear algebra concepts', 'instructor2@edtech.com', 'Mathematics', 'https://mathematicalmysteries.org/wp-content/uploads/2023/08/01_linear.jpg'),
('Web Development', 'Full stack web development course', 'instructor1@edtech.com', 'Web Development', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');

-- Course Videos (with working YouTube embed URLs)
INSERT INTO course_videos (video_url, course_id, title, description, duration) VALUES
('https://www.youtube.com/embed/rfscVS0vtbw', 1, 'Python Tutorial', 'Official Python tutorial', 45),
('https://www.youtube.com/embed/8jLOx1hD3_o', 2, 'Vectors Basics', 'Introduction to vectors', 32),
('https://www.youtube.com/embed/ok-plXXHlWw', 3, 'HTML Crash Course', 'HTML fundamentals', 38);

-- Enrollment
INSERT INTO enrollment (email, course_id) VALUES
('student1@edtech.com', 1),
('student2@edtech.com', 1),
('student3@edtech.com', 2),
('student4@edtech.com', 3),
('student1@edtech.com', 3);

-- Ratings & Reviews
INSERT INTO ratings_reviews (course_id, user_email, rating, review) VALUES
(1, 'student1@edtech.com', 4, 'Excellent content!'),
(1, 'student2@edtech.com', 5, 'Best Python course ever'),
(3, 'student1@edtech.com', 4, 'Great web dev resource');