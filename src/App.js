import { HashRouter, Navigate, Routes, Route } from "react-router-dom";
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


function App() {
  return (
    <>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to = "/login" replace/>}/>

        <Route path ="/login" element ={<Login/>}/>
        <Route path ="/dashboard" element = {<Dashboard/>}/>
        <Route path ="/metaBanner" element = {<MetaBanner/>}/>

        <Route path ="/homeBanner" element ={<HomeBanner/>}/>
        <Route path ="/addHomeBanner/:id" element ={<AddHomeBanner/>}/>

        <Route path ="/aboutUs" element = {<AboutUs/>}/>
        <Route path ="/addAboutUs/:id" element ={<AddAboutUs/>}/>

        <Route path ="/ourServices" element ={<OurServices/>}/>
        <Route path ="/addOurServices/:id" element ={<AddOurServices/>}/>

        <Route path ="/ourTeam" element ={<OurTeam/>}/>
        <Route path ="/addOurTeam/:id" element ={<AddOurTeam/>}/>

        <Route path ="/blogs" element ={<Blogs/>}/>
        <Route path ="/addBlogs/:id" element ={<AddBlogs/>}/>

        <Route path ="/faqs" element ={<FAQ/>}/>
        <Route path ="/addFAQ/:id" element ={<AddFAQ/>}/>


        <Route path ="/ourSpecialities" element ={<Specialities/>}/>
        <Route path ="/addSpecialities/:id" element ={<AddSpecialities/>}/>
        
        <Route path ="/testimonial" element ={<Testimonial/>}/>
        <Route path ="/addTestimonial/:id" element ={<AddTestimonial/>}/>


        <Route path="/metaDetails/:id" element ={<MetaDetails/>}/>
        <Route path="/bannerImage/:id" element ={<AddBannerImage/>}/>

      </Routes>
    </HashRouter>

    </>
  );
}

export default App;
