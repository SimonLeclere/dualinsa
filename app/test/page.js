"use client";

import LogoutSvg from "/app/components/icons/LogoutSvg";
import Button from "/app/components/Button";
import Link from "next/link";

export default function ProfileTopSection({ user }) {
      return (
        <div>
          <Button
            className="absolute top-4 right-4"
            onClick={() => {
              fetch("/api/courses/enroll", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ course_id: "1" }),
              }).then(() => {

              });
            }}
          >
            Test Ping
          </Button>

        </div>
      );
    }