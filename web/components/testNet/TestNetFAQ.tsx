"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "What is an Ethereum Sepolia Faucet?",
    answer:
      "A faucet provides test ETH for developers to use in testnets like Sepolia. It allows you to experiment with smart contracts and dApps without spending real ETH.",
  },
  {
    question: "Do I need a Google Cloud account?",
    answer:
      "Yes, you need to log in with your Google Cloud account to request tokens from the faucet.",
  },
  {
    question: "How much test ETH can I request?",
    answer:
      "You can typically request a limited amount per day to prevent abuse. The limits may change depending on network availability.",
  },
  {
    question: "Can I use these tokens on mainnet?",
    answer:
      "No. The faucet only provides test ETH, which has no monetary value and cannot be transferred to Ethereum mainnet.",
  },
];

export default function TestNetFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="mx-auto my-10 p-4 flex-col justify-center w-200 border border-xs rounded rounded-xl border-gray shadow shadow-xl">
      <h2 className="text-2xl font-bold mb-6 w-full text-blue-600">FAQ</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden w-full"
          >
            {/* Question Button */}
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-4 text-left text-lg font-medium hover:bg-gray-50"
            >
              <span className="text-blue-600 font-bold">{item.question}</span>
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </button>

            {/* Animated Answer */}
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="p-4 text-gray-600">{item.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}