import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import reading_image from "../assets/images/home_page.jpg";

const Home = () => {
    const typedElement = useRef(null);
    const typedInstance = useRef(null);

    useEffect(() => {
        if (typedElement.current) {
            typedInstance.current = new Typed(typedElement.current, {
                strings: [
                    "Learn Anytime, Anywhere!",
                    "Master New Skills with Experts",
                    "Your Journey to Knowledge Starts Here"
                ],
                typeSpeed: 40,
                backSpeed: 20,
                backDelay: 1500,
                loop: true,
                showCursor: true,
                cursorChar: "|",
            });
        }
        return () => {
            if (typedInstance.current) {
                typedInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen px-6 md:px-12 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12">
                {/* Left Section - Text Content */}
                <div className="md:w-full text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                        <span ref={typedElement} className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text" />
                    </h1>
                    <p className="mt-4 text-lg text-gray-700">
                        Explore interactive courses, enhance your skills, and learn from industry experts. Start your journey today!
                    </p>
                    
                    <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                        <Link to="/courses" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition">
                            Explore Courses
                        </Link>
                        <Link to="/my_learning" className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition">
                            My Learnings
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
