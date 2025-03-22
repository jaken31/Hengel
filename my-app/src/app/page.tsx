"use client";

import { useState } from 'react';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <h1>This is a cybersecurity extension</h1>
    </div>
  );
}