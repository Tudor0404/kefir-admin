"use client";

import { ReactNode } from "react";
import { AlertProvider } from "./components/alert/AlertContext";
import { ModalProvider } from "./components/modal/ModalContext";

export default function RootLayout(props: {children: ReactNode}) {
  return (
    <html>
      <body>
        <AlertProvider>
          <ModalProvider>
            {props.children}
          </ModalProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
