import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import HomeCard from "./HomeCard";
import chatting_image from "./assets/chatting.svg"
import calling_image from "./assets/calling.svg"
import location_image from "./assets/location.svg"
import mail_image from "./assets/mail.svg"

export default function Home({ darkMode }) {

    let card_icon = ['hand-holding-usd', 'shield-alt', 'user-check','chart-line']
    let card_head1 = "Welcome to FarmCredit Insight";
    let card_head2 = "Safe and Secure for Farmers";
    let card_head3 = "Simple and Easy to Use";
    let card_head4 = "Beneficial for Both Farmers and Banks";
    let card_content1 = [
        "Empowering Farmers with Smarter and Safer Credit Solutions.",
        "At FarmCredit Insight, we understand the challenges farmers face when applying for loans. That’s why we’ve created a platform that offers a fair and accurate credit evaluation specifically tailored for farmers.",
        "By analyzing factors like GIS data, weather conditions, soil type, and past yields, we provide a reliable credit score, helping both farmers and banks make informed decisions. Our goal is to create a simple, secure, and farmer-friendly experience, making loan access easier and fairer.",
    ]
    let card_content2 = [
        "We know that trust and safety are important when it comes to financial matters. That’s why our website is built to be strong and secure.",
        "All sensitive information, including passwords, is safely stored using advanced protection methods. This ensures that no one can access or misuse your data.",
        "Farmers can use our platform with full confidence, knowing their personal and financial information is kept safe."
    ]
    let card_content3 = [
        "We’ve designed FarmCredit Insight with farmers in mind. The website uses clear and simple language, avoiding difficult financial terms or technical jargon.",
        "Our user-friendly design makes it easy to track your credit score, understand what affects it, and learn how to improve it.",
        "With a clean and clear layout, even farmers who are not familiar with technology can use the platform without any confusion."
    ]
    let card_content4 =[
        "Our platform offers value not only to farmers but also to banks.",
        "By analyzing data like GIS information, weather patterns, soil quality, and previous yields, we generate an accurate credit score of Farmers.",
        "This helps banks decide whether to approve a loan or not, and if they do, how much is safe to lend.",
        "For farmers, this means better access to fair loans, and for banks, it means reliable risk assessment."
    ]

    return (
        <>
            <div
            className={`container mx-auto mt-18 space-y-8 p-15 pt-10 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
                <HomeCard 
                setImageLeft = {true}
                darkMode = { darkMode }
                card_image = { chatting_image }
                card_content = { card_content1 }
                card_head = { card_head1 }
                card_icon = { card_icon[0] } />
                <HomeCard
                setImageLeft = {false}
                darkMode = { darkMode }
                card_image = { calling_image }
                card_content = { card_content2 }
                card_head = { card_head2 }
                card_icon = { card_icon[1] } />
                <HomeCard
                setImageLeft = {true}
                darkMode = { darkMode }
                card_image = { location_image }
                card_content = { card_content3 }
                card_head = { card_head3 }
                card_icon = { card_icon[2] } />
                <HomeCard
                setImageLeft = {false}
                darkMode = { darkMode }
                card_image = { mail_image }
                card_content = { card_content4 }
                card_head = { card_head4 }
                card_icon = { card_icon[3] } />
            </div>
        </>
    )
}