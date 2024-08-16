// src/App.js
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./views/login/login";
import Dashboard from "./views/home/dashboard/dashboard";
import AboutUs from "./views/home/about/about";
import AddAboutUs from "./views/home/about/addAbout";
import OurServices from "./views/home/ourServices/ourServices";
import AddOurServices from "./views/home/ourServices/addOurServices";
import OurTeam from "./views/home/ourTeam/ourTeam";
import AddOurTeam from "./views/home/ourTeam/addOurTeam";
import Blogs from "./views/home/blogs/blogs";
import AddBlogs from "./views/home/blogs/add_blogs";
import FAQ from "./views/home/faq/faq";
import AddFAQ from "./views/home/faq/add_faq";
import Specialities from "./views/other/ourSpecialities/ourSpecialities";
import AddSpecialities from "./views/other/ourSpecialities/addOurSpecialities";
import Testimonial from "./views/other/testimonial/testimonial";
import AddTestimonial from "./views/other/testimonial/addTestimonial";
import HomeBanner from "./views/home/homeBanner/homeBanner";
import AddHomeBanner from "./views/home/homeBanner/addHomeBanner";
import MetaDetails from "./views/widgets/metaDetails";
import MetaBanner from "./views/home/meta_banner";
import AddBannerImage from "./views/widgets/bannerImage";
import Query from "./views/enquiry/user_query";
import Appointment from "./views/enquiry/appointment";
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/metaBanner" element={<PrivateRoute element={<MetaBanner />} />} />
        <Route path="/homeBanner" element={<PrivateRoute element={<HomeBanner />} />} />
        <Route path="/addHomeBanner/:id" element={<PrivateRoute element={<AddHomeBanner />} />} />
        <Route path="/aboutUs" element={<PrivateRoute element={<AboutUs />} />} />
        <Route path="/addAboutUs/:id" element={<PrivateRoute element={<AddAboutUs />} />} />
        <Route path="/ourServices" element={<PrivateRoute element={<OurServices />} />} />
        <Route path="/addOurServices/:id" element={<PrivateRoute element={<AddOurServices />} />} />
        <Route path="/ourTeam" element={<PrivateRoute element={<OurTeam />} />} />
        <Route path="/addOurTeam/:id" element={<PrivateRoute element={<AddOurTeam />} />} />
        <Route path="/blogs" element={<PrivateRoute element={<Blogs />} />} />
        <Route path="/addBlogs/:id" element={<PrivateRoute element={<AddBlogs />} />} />
        <Route path="/faqs" element={<PrivateRoute element={<FAQ />} />} />
        <Route path="/addFAQ/:id" element={<PrivateRoute element={<AddFAQ />} />} />
        <Route path="/ourSpecialities" element={<PrivateRoute element={<Specialities />} />} />
        <Route path="/addSpecialities/:id" element={<PrivateRoute element={<AddSpecialities />} />} />
        <Route path="/testimonial" element={<PrivateRoute element={<Testimonial />} />} />
        <Route path="/addTestimonial/:id" element={<PrivateRoute element={<AddTestimonial />} />} />
        <Route path="/metaDetails/:id" element={<PrivateRoute element={<MetaDetails />} />} />
        <Route path="/bannerImage/:id" element={<PrivateRoute element={<AddBannerImage />} />} />
        <Route path="/userQuery" element={<PrivateRoute element={<Query />} />} />
        <Route path="/appointment" element={<PrivateRoute element={<Appointment />} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
