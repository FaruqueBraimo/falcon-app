"use client";

import LayoutRooter from "./LayoutRooter";
import { AuthProvider } from "./contexts/AuthContext";

export default function Home() {
  return (
    <AuthProvider>
      <LayoutRooter />
    </AuthProvider>
  );
}
