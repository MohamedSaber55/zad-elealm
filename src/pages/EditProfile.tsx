import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Camera, ArrowLeft } from "iconsax-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getUserProfileAsync } from "../store/slices/auth";
import avatarImage from "../assets/avatar.png";
const UpdateProfile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { token, userProfile } = useSelector((state: RootState) => state.auth);
    const [avatar, setAvatar] = useState<string | undefined>(userProfile?.imageUrl || avatarImage);

    useEffect(() => {
        if (token) {
            dispatch(getUserProfileAsync({ token }));
        }
    }, [token, dispatch]);
    useEffect(() => {
        if (userProfile?.imageUrl) {
            setAvatar(userProfile.imageUrl);
        }
    }, [userProfile]);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => setAvatar(e.target?.result as string);
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    return (
        <div className="dark:bg-dark dark:text-white min-h-main py-10">
            <div className="container max-w-lg mx-auto bg-white dark:bg-dark-light rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">تحديث الحساب</h2>
                    <Link to="/profile" className="text-gray-500 hover:text-primary">
                        <ArrowLeft size="24" />
                    </Link>
                </div>

                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative w-32 h-32 border rounded-full">
                        <img src={avatar} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
                        <label
                            htmlFor="avatarUpload"
                            className="absolute bottom-2 right-0 bg-primary p-1 rounded-full cursor-pointer"
                        >
                            <Camera size="20" color="currentColor" className="text-white" />
                        </label>
                        <input
                            type="file"
                            id="avatarUpload"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>
                </div>

                {/* Form */}
                <Formik
                    initialValues={{
                        displayName: userProfile?.displayName || "",
                        userName: userProfile?.userName || "",
                        email: userProfile?.email || "",
                        phoneNumber: userProfile?.phoneNumber || "",
                        imageUrl: userProfile?.imageUrl || "",
                    }}
                    enableReinitialize={true}
                    validationSchema={Yup.object({
                        displayName: Yup.string().required("الاسم مطلوب"),
                        userName: Yup.string().required("اسم المستخدم مطلوب"),
                        email: Yup.string().email("بريد غير صالح").required("البريد مطلوب"),
                        phoneNumber: Yup.string().matches(/^[0-9]{10,15}$/, "رقم الهاتف غير صالح"),
                    })}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="block text-sm font-medium mb-1">الاسم الكامل</label>
                                <Field type="text" name="displayName" className="border border-primary p-2 rounded-lg" />
                                <ErrorMessage name="displayName" component="div" className="text-danger text-xs mt-1" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="block text-sm font-medium mb-1">اسم المستخدم</label>
                                <Field type="text" name="userName" className="border border-primary p-2 rounded-lg" />
                                <ErrorMessage name="userName" component="div" className="text-danger text-xs mt-1" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                                <Field type="email" name="email" className="border border-primary p-2 rounded-lg" />
                                <ErrorMessage name="email" component="div" className="text-danger text-xs mt-1" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="block text-sm font-medium mb-1">رقم الهاتف (اختياري)</label>
                                <Field type="text" name="phoneNumber" className="border border-primary p-2 rounded-lg" />
                                <ErrorMessage name="phoneNumber" component="div" className="text-danger text-xs mt-1" />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between gap-2 mt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg"
                                >
                                    حفظ التغييرات
                                </button>
                                <Link to="/profile" className="w-full text-center bg-muted dark:bg-muted-dark hover:bg-muted-dark-alt py-2 rounded-lg">
                                    إلغاء
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default UpdateProfile;
