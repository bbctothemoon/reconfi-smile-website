"use client";
import Hero from '@/components/Hero';
import Calculator from '@/components/Calculator';
import TestimonialsWithBeforeAfter from '@/components/TestimonialsWithBeforeAfter';
import LeadForm from '@/components/LeadForm';
import { useState } from 'react';

export default function SalesPage() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Calculator />
      {/* CTA 區塊 */}
      <div className="text-center my-8">
        <button
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-blue-700 transition-colors"
          onClick={() => setShowForm(true)}
        >
          完成線上諮詢即減 $500
        </button>
      </div>
      {/* Funnel 表單（暫時只顯示提示，之後會完善） */}
      {showForm && (
        <div className="max-w-xl mx-auto bg-gray-50 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">線上諮詢表單（即將完善）</h2>
          <p>你最想改善嘅牙齒問題、WhatsApp、上載相片等功能會喺呢度出現。</p>
        </div>
      )}
      <TestimonialsWithBeforeAfter />
      <LeadForm />
    </div>
  );
} 