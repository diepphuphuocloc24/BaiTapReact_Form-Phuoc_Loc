import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addStudent } from "./../slice";

const StudentForm = () => {
    const dispatch = useDispatch();
    const students = useSelector((state) => state.student.students);

    const [form, setForm] = useState({
        studentId: "",
        fullName: "",
        phone: "",
        email: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addStudent(form));
        alert("Thêm sinh viên thành công!");
        setForm({ studentId: "", fullName: "", phone: "", email: "" });
    };

    return (
        <section className="py-8">
            <div className="container mx-auto">
                <div className="w-[90%] mx-auto">
                    <div className="flex justify-between items-center gap-10">
                        <div className="w-3/5 flex flex-col justify-center items-center">
                            <h1 className="text-5xl font-extrabold mb-8 text-center text-white tracking-tight drop-shadow-lg">
                                Hệ thống đăng ký sinh viên
                            </h1>
                            <p className="text-lg mb-8 max-w-lg text-center text-gray-300 leading-relaxed">
                                Cổng thông tin đăng ký sinh viên giúp bạn dễ dàng tạo tài khoản, cập nhật hồ sơ và quản lý học tập mọi lúc mọi nơi.
                            </p>
                        </div>

                        <div className="w-2/5 flex flex-col justify-center items-center rounded-3xl bg-white/10 backdrop-blur-xs p-8">
                            <div className="w-full flex flex-col space-y-8">
                                <h2 className="text-4xl font-extrabold mb-10 text-center text-white tracking-wide">
                                    Thông tin sinh viên
                                </h2>

                                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                    {["studentId", "fullName", "phone", "email"].map((field) => (
                                        <div key={field} className="flex flex-col">
                                            <label htmlFor={field} className="text-white font-semibold mb-2">
                                                {field === "studentId" ? "Mã Sinh viên" :
                                                    field === "fullName" ? "Họ và Tên" :
                                                        field === "phone" ? "Số điện thoại" : "Email"}
                                            </label>
                                            <input
                                                type={field === "email" ? "email" : "text"}
                                                id={field}
                                                name={field}
                                                placeholder={`Nhập ${field === "studentId" ? "mã sinh viên" :
                                                    field === "fullName" ? "họ và tên" :
                                                        field === "phone" ? "số điện thoại" : "email"}`}
                                                value={form[field]}
                                                onChange={handleChange}
                                                className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                                                required
                                            />
                                        </div>
                                    ))}

                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="px-10 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                                        >
                                            Thêm sinh viên
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <div className="w-full overflow-x-auto rounded-xl shadow-lg">
                            <table className="w-full divide-y divide-gray-300">
                                <thead className="bg-gray-900">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-gray-200 font-semibold">Mã Sinh viên</th>
                                        <th className="px-6 py-4 text-left text-gray-200 font-semibold">Họ và Tên</th>
                                        <th className="px-6 py-4 text-left text-gray-200 font-semibold">Số điện thoại</th>
                                        <th className="px-6 py-4 text-left text-gray-200 font-semibold">Email</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-300">
                                    {students.map((s, i) => (
                                        <tr key={i} className="hover:bg-indigo-50 transition">
                                            <td className="px-6 py-4">{s.studentId}</td>
                                            <td className="px-6 py-4">{s.fullName}</td>
                                            <td className="px-6 py-4">{s.phone}</td>
                                            <td className="px-6 py-4">{s.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentForm
