"use client";

import { useState } from "react";
import {
  FiUser,
    FiLogOut,
  FiCheckCircle,
  FiPackage,
  FiSettings,
  FiPhone,
  FiMail,
  FiChevronDown,
  FiChevronUp,
  FiCopy,
} from "react-icons/fi";

const helpSections = [
  {
    icon: <FiUser />,
    title: "Account & Login",
    questions: [
      {
        question: "How do I create a farmer account?",
        answer:
          "Go to the Register page, select 'Farmer', fill in your details, and submit the registration form.",
      },
      {
        question: "I forgot my password. What should I do?",
        answer: "Contact the administrator to reset your account password.",
      },
      {
        question: "Why can't I log in?",
        answer:
          "Check your email and password, make sure your internet connection is working, and verify that your account exists.",
      },
      {
        question: "Can I edit my profile information?",
        answer:
          "Yes. Open Profile from the top menu and update your name, phone number, address, and profile picture.",
      },
    ],
  },

  {
    icon: <FiCheckCircle />,
    title: "Verification",
    questions: [
      {
        question: "Why is my account not verified?",
        answer:
          "Every farmer account must be reviewed by the administrator before products can be sold.",
      },
      {
        question: "How long does verification take?",
        answer:
          "Verification usually takes a short time, but it depends on the administrator.",
      },
      {
        question: "Can I add products before verification?",
        answer: "No. Only verified farmers can add new products.",
      },
      {
        question: "Who should I contact about verification?",
        answer:
          "Use the phone number or email at the bottom of this page to contact the administrator.",
      },
    ],
  },

  {
    icon: <FiPackage />,
    title: "Products & Inventory",
    questions: [
      {
        question: "How do I add a new product?",
        answer:
          "Open 'Add Product' from the navbar, fill in all details, upload product images, and click Save.",
      },
      {
        question: "Why can't I see the Add Product button?",
        answer:
          "The Add Product button appears only after your account has been verified.",
      },
      {
        question: "Can I edit my products?",
        answer:
          "Yes. Open 'Manage Products' and click the edit button on any product.",
      },
      {
        question: "How do I delete a product?",
        answer: "Go to Manage Products and click the delete icon.",
      },
      {
        question: "Why is my product image not uploading?",
        answer:
          "Only image files are allowed, and the file size must be within the allowed limit.",
      },
      {
        question: "Why does product upload fail?",
        answer:
          "Check your internet connection and verify that all required fields are filled correctly.",
      },
    ],
  },

  {
    icon: <FiPackage />,
    title: "Orders & Delivery",
    questions: [
      {
        question: "Where can I see customer orders?",
        answer: "Open your dashboard to see all incoming orders.",
      },
      {
        question: "How do I update an order status?",
        answer:
          "Select an order and change its status to Confirmed, Packed, Out for Delivery, or Delivered.",
      },
      {
        question: "Can customers cancel orders?",
        answer:
          "Customers can cancel only orders that have not yet been delivered.",
      },
      {
        question: "What happens after I mark an order as delivered?",
        answer:
          "The order will be completed and included in your sales history.",
      },
    ],
  },

  {
    icon: <FiSettings />,
    title: "Technical Problems",
    questions: [
      {
        question: "The website is slow or not loading.",
        answer:
          "Refresh the page, check your internet connection, and try again later.",
      },
      {
        question: "The server shows an error.",
        answer:
          "Please contact the administrator and provide a screenshot of the error.",
      },
      {
        question: "Images are not appearing.",
        answer:
          "Refresh the page and verify that the uploaded image format is supported.",
      },
      {
        question: "The page is blank or buttons do not work.",
        answer:
          "Log out and log in again. If the problem continues, contact support.",
      },
    ],
  },
];

export default function FarmerHelpPage() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-[#abbe9f] p-8 text-gray-800">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-3 text-5xl font-bold text-[#346739]">
          Farmer Help Center 🌾
        </h1>

        <p className="mb-10 text-lg text-gray-500">
          Find answers to common questions about your account, products, orders,
          and technical issues.
        </p>

        <div className="space-y-8">
          {helpSections.map((section, sectionIndex) => (
            <div
              key={section.title}
              className="rounded-3xl bg-[#d5e3d5] p-6 shadow"
            >
              <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold text-[#346739]">
                <span className="text-3xl">{section.icon}</span>

                {section.title}
              </h2>

              <div className="space-y-3">
                {section.questions.map((item, questionIndex) => {
                  const id = `${sectionIndex}-${questionIndex}`;

                  return (
                    <div
                      key={id}
                      className="overflow-hidden rounded-2xl border"
                    >
                      <button
                        onClick={() => toggleQuestion(id)}
                        className="flex w-full items-center justify-between p-5 text-left font-medium hover:bg-gray-50"
                      >
                        <span>{item.question}</span>

                        <span className="text-xl text-[#346739]">
                          {openQuestion === id ? (
                            <FiChevronUp />
                          ) : (
                            <FiChevronDown />
                          )}
                        </span>
                      </button>

                      {openQuestion === id && (
                        <div className="border-t bg-gray-50 p-5 text-gray-600">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-green-50 p-6 shadow">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-[#346739]">
            <FiPhone />
            Contact Administrator
          </h2>

          <div className="mt-5 space-y-4">

  <button
    onClick={() => {
      navigator.clipboard.writeText("+91 9876543210");

      toast.success(
        "Phone number copied"
      );
    }}
    className="
      flex
      w-full
      items-center
      justify-between
      rounded-xl
      border
      border-gray-200
      bg-white
      p-4
      transition
      hover:bg-gray-50
    "
  >
    <div className="flex items-center gap-3">
      <FiPhone className="text-xl text-[#346739]" />

      <span className="font-medium">
        +91 9876543210
      </span>
    </div>

    <FiCopy className="text-gray-500" />
  </button>

  <button
    onClick={() => {
      navigator.clipboard.writeText(
        "admin@greenbasket.com"
      );

      toast.success(
        "Email copied"
      );
    }}
    className="
      flex
      w-full
      items-center
      justify-between
      rounded-xl
      border
      border-gray-200
      bg-white
      p-4
      transition
      hover:bg-gray-50
    "
  >
    <div className="flex items-center gap-3">
      <FiMail className="text-xl text-[#346739]" />

      <span className="font-medium">
        admin@greenbasket.com
      </span>
    </div>

    <FiCopy className="text-gray-500" />
  </button>

</div>


          <p className="mt-4 text-gray-600">
            If your problem is not listed above, contact the administrator
            directly.
          </p>
        </div>
      </div>
    </main>
  );
}
