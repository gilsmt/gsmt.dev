"use client";

import { useEffect, useState } from "react";
import { dayjs } from "@/lib/dayjs";

const HOUR_HAND_DEG_PER_HOUR = 30; // 360° / 12 hours = 30° per hour.
const HOUR_HAND_DEG_PER_MINUTE = 0.5; // 30° spread over 60 minutes = 0.5° per minute.
const MINUTE_HAND_DEG_PER_MINUTE = 6; // 360° / 60 minutes = 6° per minute.
const MINUTE_HAND_DEG_PER_SECOND = 0.1; // 6° spread over 60 seconds = 0.1° per second.
const SECOND_HAND_DEG_PER_SECOND = 6; // 360° / 60 seconds = 6° per second.

const Clock = ({ timezone }: { timezone: string }) => {
    const [time, setTime] = useState(() => dayjs().tz(timezone));

    useEffect(() => {
        const timer = window.setInterval(() => {
            setTime(dayjs().tz(timezone));
        }, 1000);
        return () => window.clearInterval(timer);
    }, [timezone]);

    const hourAngle =
        (time.hour() % 12) * HOUR_HAND_DEG_PER_HOUR + // % 12 folds 24h time onto the 12h face (15:00 looks like 3:00).
        time.minute() * HOUR_HAND_DEG_PER_MINUTE;

    const minuteAngle =
        time.minute() * MINUTE_HAND_DEG_PER_MINUTE +
        time.second() * MINUTE_HAND_DEG_PER_SECOND;

    const secondAngle = time.second() * SECOND_HAND_DEG_PER_SECOND;

    return (
        <div className="relative size-6 rounded-full border-2 border-dotted border-gray-600 bg-gray-100 opacity-50">
            <div
                className="absolute bottom-1/2 left-1/2 z-30 h-1.5 w-px origin-bottom bg-gray-800"
                style={{
                    transform: `translateX(-50%) rotate(${hourAngle}deg)`,
                }}
                suppressHydrationWarning
            />
            <div
                className="absolute bottom-1/2 left-1/2 z-20 h-2 w-px origin-bottom bg-gray-800"
                style={{
                    transform: `translateX(-50%) rotate(${minuteAngle}deg)`,
                }}
                suppressHydrationWarning
            />
            <div
                className="absolute bottom-1/2 left-1/2 z-10 h-2 w-px origin-bottom bg-red-500"
                style={{
                    transform: `translateX(-50%) rotate(${secondAngle}deg)`,
                }}
                suppressHydrationWarning
            />
        </div>
    );
};

export { Clock };
