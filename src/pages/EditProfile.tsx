import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Camera, ArrowLeft } from "iconsax-react";
import { Link } from "react-router-dom";

const user = {
    name: "محمد أحمد",
    email: "mohamed@example.com",
    avatar: "https://i.ytimg.com/vi/tdOCkSvoH8k/hqdefault.jpg", // Replace with real user image
};

const EditProfile = () => {
    const [avatar, setAvatar] = useState(user.avatar);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => setAvatar(e.target?.result as string);
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    return (
        <div className="dark:bg-dark dark:text-white min-h-main py-10">
            <div className="container max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">تعديل الحساب</h2>
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
                            <Camera size="20" className="text-white" />
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
                        name: user.name,
                        email: user.email,
                        password: "",
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required("الاسم مطلوب"),
                        email: Yup.string().email("بريد غير صالح").required("البريد مطلوب"),
                        password: Yup.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
                    })}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="block text-sm font-medium mb-1">الاسم</label>
                                <Field type="text" name="name" className=" border border-primary p-2 rounded-lg" />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                                <Field type="email" name="email" className="border border-primary p-2 rounded-lg" />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="block text-sm font-medium mb-1">كلمة المرور (اختياري)</label>
                                <Field type="password" name="password" className="border border-primary p-2 rounded-lg"  />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between gap-2 mt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary text-white py-2 rounded-lg"
                                >
                                    حفظ التغييرات
                                </button>
                                <Link to="/profile" className="w-full text-center bg-gray-300 dark:bg-gray-700 py-2 rounded-lg">
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

export default EditProfile;
