import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
    Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import FeaturesAndBenefits from "./components/FeaturesAndBenefits";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import GetInvolved from "./components/GetInvolved";
import UploadScan from "./components/UploadScan";
import TipsAndCare from "./components/TipsAndCare";
import FindDoctor from "./components/FindDoctor";
import FreeCamps from "./components/FreeCamps";
import AboutUs from "./components/AboutUs";
import Signup from "./components/Signup";
import TryNow from "./components/TryNow";
import Login from "./components/Login";
import Volunteer from "./components/Volunteer";
import Donate from "./components/Donate";
import Share from "./components/Share";
import AIBotAssistant from "./components/AIBotAssistant";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import BookAppointment from "./components/BookAppointment";
import Register from "./components/Register";
import GorakhpurSpecialists from "./components/GorakhpurSpecialists";

function AppContent() {
    const location = useLocation();

    // ✅ hide bot on auth pages
    const hideBotRoutes = ["/login", "/signup", "/register"];
    const shouldShowBot = !hideBotRoutes.includes(location.pathname);

    return ( <
        >
        <
        Navbar / >

        <
        Routes >
        <
        Route path = "/"
        element = { <
            >
            <
            HeroSection / >
            <
            HowItWorks / >
            <
            FeaturesAndBenefits / >
            <
            Testimonials / >
            <
            FAQ / >
            <
            GetInvolved / >
            <
            />
        }
        />

        <
        Route path = "/upload"
        element = { < UploadScan / > }
        /> <
        Route path = "/tips"
        element = { < TipsAndCare / > }
        /> <
        Route path = "/find-doctor"
        element = { < FindDoctor / > }
        /> <
        Route path = "/free-camps"
        element = { < FreeCamps / > }
        /> <
        Route path = "/about"
        element = { < AboutUs / > }
        />

        { /* AUTH */ } <
        Route path = "/login"
        element = { < Login / > }
        /> <
        Route path = "/signup"
        element = { < Signup / > }
        /> <
        Route path = "/register"
        element = { < Register / > }
        />

        <
        Route path = "/try-now"
        element = { < TryNow / > }
        /> <
        Route path = "/volunteer"
        element = { < Volunteer / > }
        /> <
        Route path = "/donate"
        element = { < Donate / > }
        /> <
        Route path = "/share"
        element = { < Share / > }
        /> <
        Route path = "/profile"
        element = { < Profile / > }
        />

        { /* Appointment */ } <
        Route path = "/book-appointment"
        element = { < BookAppointment / > }
        />

        <
        Route path = "/gorakhpur-specialists"
        element = { < GorakhpurSpecialists / > }
        />

        { /* Protected Dashboard */ } <
        Route path = "/dashboard"
        element = { <
            PrivateRoute >
            <
            Dashboard / >
            <
            /PrivateRoute>
        }
        />

        { /* Fallback */ } <
        Route path = "*"
        element = { < Navigate to = "/" / > }
        /> < /
        Routes >

        { shouldShowBot && < AIBotAssistant / > }

        <
        Footer / >
        <
        />
    );
}

function App() {
    return ( <
        Router >
        <
        AppContent / >
        <
        /Router>
    );
}

export default App;