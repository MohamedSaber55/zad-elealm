import { NotificationBing, TickCircle, Trash } from "iconsax-react";
import { useEffect } from "react";
import { formatDateTime } from "../utils/formatDateTime";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { deleteNotification, getNotifications, markAllAsRead, markOneAsRead } from "../store/slices/notifications";
import { notify } from "../utils/notify";
import Loading from "../components/Loading";
import NoData from "../components/NoData";

export default function NotificationsPage() {
    const dispatch = useDispatch<AppDispatch>()
    const { token } = useSelector((state: RootState) => state.auth)
    const state = useSelector((state: RootState) => state.notifications)
    const notifications = state.notifications || []
    useEffect(() => {
        if (token) {
            dispatch(getNotifications({ token }))
        }
    }, [token, dispatch])
    const handleMarkAsRead = (id: number) => {
        if (token) {
            dispatch(markOneAsRead({ token, id })).then(() => {
                dispatch(getNotifications({ token }))
            })
        }
        notify("تم وضع الإشعار كمقروء", "success");
    };
    const handleDeleteNotification = (id: number) => {
        if (token) {
            dispatch(deleteNotification({ token, id })).then(() => {
                dispatch(getNotifications({ token }))
            })
        }
        notify("تم حذف الإشعار", "success");
    };
    const handleMarkAllAsRead = () => {
        if (token) {
            dispatch(markAllAsRead({ token })).then(() => {
                dispatch(getNotifications({ token }))
            })
        }
        notify(" تم قراءة جميع الإشعارات", "success")
    };

    return (
        <div className="min-h-main dark:bg-dark dark:text-white">
            {state.loading ? <div className="h-main"><Loading /></div> :
                <div className="container">
                    <div className="heading flex justify-between items-center gap-5">
                        <h2 className="heading text-2xl font-bold my-10 flex items-center gap-2">
                            <NotificationBing color="currentColor" variant="Bulk" size={32} className="text-warning" /> الإشعارات <span className="text-dark dark:text-muted">( <span className="text-danger">{state.unreadCount || 0}</span>/{state.totalCount || 0} )</span>
                        </h2>
                        <button
                            onClick={handleMarkAllAsRead}
                            className="flex items-center gap-2 px-4 py-2 bg-primary dark:bg-primary-light text-white rounded-md hover:bg-primary-dark transition-colors"
                        >
                            <TickCircle color="currentColor" variant="Bold" size={20} />
                            <span>تعليم الكل كمقروء</span>
                        </button>
                    </div>
                    {notifications.length > 0 ?
                        <ul className="pb-10 flex flex-col gap-4">
                            {notifications.map((notif) => (
                                <li
                                    key={notif.id}
                                    className={`flex flex-col gap-2 p-4 border-b border-primary-light border rounded-lg ${!notif.isRead ? "bg-track dark:bg-dark-lighter" : "bg-white dark:bg-dark-light"
                                        }`}
                                >
                                    <div className="space-y-1">
                                        <p className="font-semibold text-dark dark:text-light">{notif.title}</p>
                                        <p className="text-sm text-muted-dark dark:text-muted">{notif.description}</p>
                                        <span className="text-xs text-muted-dark dark:text-muted">{formatDateTime(notif.createdAt, { isArabic: true, showDate: true, showTime: true })}</span>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        {!notif.isRead && (
                                            <button
                                                onClick={() => handleMarkAsRead(notif.id)}
                                                className="text-primary hover:text-primary-dark bg-greenish-gray dark:bg-muted-green p-3 py-1 rounded-lg flex items-center gap-1 self-start"
                                            >
                                                <TickCircle color="currentColor" size={18} /> مقروء
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteNotification(notif.id)}
                                            className="bg-danger/20 text-danger p-3 py-1 rounded-lg flex items-center gap-1 self-start"
                                        >
                                            <Trash color="currentColor" size={18} /> مقروء
                                            حذف
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        : <div><NoData /></div>}
                </div>
            }
        </div>
    );
}
