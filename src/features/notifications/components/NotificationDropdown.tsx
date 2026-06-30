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
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const unreadCount = notifications?.filter((item) => !item.read).length || 0;

  const handleRead = async (id: string) => {
    await notificationService.markAsRead(id);
    queryClient.invalidateQueries({
      queryKey: ["notifications", user?.uid],
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative rounded-xl p-2 hover:bg-section"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-error/100 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <AppCard
          className="
            fixed
            left-4
            right-4
            top-20
            sm:absolute
            sm:right-0
            sm:left-auto
            sm:top-auto
            sm:mt-2
            sm:w-96
            max-h-[500px]
            overflow-y-auto
            overscroll-contain
            z-50
          "
        >
          <h3 className="mb-4 font-medium">Notifikasi</h3>

          {notifications?.length === 0 ? (
            <p className="text-sm text-secondary-text">Belum ada notifikasi</p>
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
                    p-4
                    transition
                    min-h-[48px]
                    ${item.read ? "bg-surface" : "bg-accent border-primary/30"}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{item.title}</p>
                    {!item.read && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="mt-1 text-sm text-secondary-text">
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
