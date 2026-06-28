import { Bell } from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useNotifications } from "../hooks/useNotifications";

import AppCard from "@/components/common/AppCard";

import { notificationService } from "../services/notificationService";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);

  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { data: notifications } = useNotifications(user?.uid || "");
  const previousCount = useRef(0);
  useEffect(() => {
    if (!notifications) return;

    if (
      previousCount.current > 0 &&
      notifications.length > previousCount.current
    ) {
      const latest = notifications[0];

      toast.success(latest.title, {
        description: latest.message,
      });
    }

    previousCount.current = notifications.length;
  }, [notifications]);
  const unreadCount = notifications?.filter((item) => !item.read).length || 0;
  const handleRead = async (id: string) => {
    await notificationService.markAsRead(id);

    queryClient.invalidateQueries({
      queryKey: ["notifications", user?.uid],
    });
  };
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
        relative
        rounded-xl
        p-2
        hover:bg-section
        "
      >
        <Bell size={18} />

        {unreadCount > 0 && (
          <span
            className="
            absolute
            -right-1
            -top-1
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-full
            bg-error/100
            text-xs
            text-white
            "
          >
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <AppCard
          className="
          absolute
          right-0
          mt-2
          w-[calc(100vw-16px)] sm:w-96
          max-h-[500px]
          overflow-y-auto
          z-50
          "
        >
          <h3 className="mb-4 font-medium">Notifications</h3>

          {notifications?.length === 0 ? (
            <p className="text-sm text-secondary-text">No notifications yet</p>
          ) : (
            <div className="space-y-3">
              {notifications?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleRead(item.id)}
                  className={`
    cursor-pointer
    rounded-xl
    border
    p-3
    transition

    ${item.read ? "bg-surface" : "bg-accent border-primary/30"}
  `}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{item.title}</p>

                    {!item.read && (
                      <span
                        className="
      h-2
      w-2
      rounded-full
      bg-blue-600
      "
                      />
                    )}
                  </div>

                  <p
                    className="
                    mt-1
                    text-sm
                    text-secondary-text
                    "
                  >
                    {item.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </AppCard>
      )}
    </div>
  );
}
