import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addStudentRegister, updateStudentRegister } from "./../slice";

const StudentForm = () => {

    const dispatch = useDispatch();

    const dataStudents = useSelector((state) => {
        return state.studentRegisterReducer.students
    });

    const [userRegister, setUserRegister] = useState({
        studentId: "",
        fullName: "",
        phone: "",
        email: ""
    });

    const [error, setError] = useState({
        studentId: "",
        fullName: "",
        phone: "",
        email: ""
    });

    // Search
    const [searchText, setSearchText] = useState("");

    // Editing mode
    const [editingId, setEditingId] = useState(null);

    // FILTERED LIST
    const filteredStudents = dataStudents.filter((student) => {
        return student.fullName.toLowerCase().includes(searchText.toLowerCase())
    }
    );

    useEffect(() => {
        if (editingId !== null) {
            const stu = dataStudents.find((s) => s.studentId === editingId);
            if (stu) setUserRegister(stu);
        }
    }, [editingId, dataStudents]);


    // VALIDATION
    const handleChangeInput = (event) => {
        const { id, value } = event.target;

        const newUserRegister = {
            ...userRegister,
            [id]: value,
        };

        let newError = { ...error };

        const fieldNames = {
            studentId: "Mã sinh viên",
            fullName: "Họ và tên",
            phone: "Số điện thoại",
            email: "Email"
        };

        if (value.trim() === "") {
            newError[id] = `${fieldNames[id]} không được để trống`;
        } else {
            newError[id] = "";

            switch (id) {
                case "studentId":
                    if (!/^[A-Za-z0-9]{3,10}$/.test(value))
                        newError[id] = "studentId không đúng định dạng";
                    break;
                case "fullName":
                    if (!/^[A-Za-zÀ-ỹ\s]{1,50}$/.test(value))
                        newError[id] = "fullName không đúng định dạng";
                    break;
                case "phone":
                    if (!/^\d{10,12}$/.test(value))
                        newError[id] = "phone không đúng định dạng";
                    break;
                case "email":
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                        newError[id] = "email không đúng định dạng";
                    break;
            }
        }

        setUserRegister(newUserRegister);
        setError(newError);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        let newError = {};
        let hasEmpty = false;

        const fieldNames = {
            studentId: "Mã sinh viên",
            fullName: "Họ và tên",
            phone: "Số điện thoại",
            email: "Email"
        };

        for (let key in userRegister) {
            if (!userRegister[key].trim()) {
                newError[key] = `${fieldNames[key]} không được để trống`;
                hasEmpty = true;
            } else newError[key] = "";
        }

        setError(newError);
        if (hasEmpty) return;


        if (editingId === null) {
            dispatch(addStudentRegister(userRegister));
        } else {
            dispatch(updateStudentRegister(userRegister));
            setEditingId(null);
        }

        setUserRegister({ studentId: "", fullName: "", phone: "", email: "" });
    };


    return (
        <section className="py-8 flex justify-center items-center">
            <div className="container mx-auto">
                <div className="w-[90%] mx-auto">

                    {/* HEADER */}
                    <div className="flex justify-between items-center gap-10">

                        <div>
                            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight drop-shadow-2xl text-center">
                                🎓 Hệ thống <span className="text-amber-400">đăng ký sinh viên</span>
                            </h1>
                            <p className="text-lg md:text-xl mb-6 max-w-lg text-gray-200 leading-relaxed">
                                Cổng thông tin <span className="font-semibold text-white">đăng ký sinh viên</span> giúp bạn dễ dàng quản lý hồ sơ học tập.
                            </p>
                        </div>

                        {/* FORM */}
                        <div className="w-full md:w-2/5 flex flex-col justify-center items-center rounded-3xl bg-white/10 backdrop-blur-sm p-8 shadow-2xl">
                            <div className="w-full flex flex-col space-y-8">
                                <h2 className="text-3xl font-extrabold mb-10 text-center text-white tracking-wide">
                                    Thông tin sinh viên
                                </h2>

                                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                    <div className="flex flex-col">
                                        <label className="text-white font-semibold mb-2">Mã Sinh viên</label>
                                        <input type="text" id="studentId" value={userRegister.studentId}
                                            onChange={handleChangeInput}
                                            className="w-full px-5 py-3 rounded-xl border" />
                                        <p className="text-red-500 text-sm">{error.studentId}</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="text-white font-semibold mb-2">Họ và Tên</label>
                                        <input type="text" id="fullName" value={userRegister.fullName}
                                            onChange={handleChangeInput}
                                            className="w-full px-5 py-3 rounded-xl border" />
                                        <p className="text-red-500 text-sm">{error.fullName}</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="text-white font-semibold mb-2">Số điện thoại</label>
                                        <input type="text" id="phone" value={userRegister.phone}
                                            onChange={handleChangeInput}
                                            className="w-full px-5 py-3 rounded-xl border" />
                                        <p className="text-red-500 text-sm">{error.phone}</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="text-white font-semibold mb-2">Email</label>
                                        <input type="email" id="email" value={userRegister.email}
                                            onChange={handleChangeInput}
                                            className="w-full px-5 py-3 rounded-xl border" />
                                        <p className="text-red-500 text-sm">{error.email}</p>
                                    </div>

                                    <div className="text-center">
                                        <button type="submit"
                                            className="px-10 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700">
                                            {editingId ? "Cập nhật" : "Thêm sinh viên"}
                                        </button>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>


                    {/* SEARCH */}
                    <div className="mt-10 flex justify-center">
                        <input
                            type="text"
                            placeholder="🔍 Tìm kiếm theo họ tên..."
                            className="px-4 py-2 rounded-xl w-1/2 text-black"
                            value={searchText}
                            onChange={(event) => {
                                return setSearchText(event.target.value)
                            }}
                        />
                    </div>


                    {/* TABLE */}
                    <div className="flex justify-center mt-12">
                        <div className="w-full overflow-x-auto rounded-xl shadow-lg">
                            <table className="w-full divide-y divide-gray-300">
                                <thead className="bg-gray-900">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-gray-200">Mã Sinh viên</th>
                                        <th className="px-6 py-4 text-left text-gray-200">Họ và Tên</th>
                                        <th className="px-6 py-4 text-left text-gray-200">Số điện thoại</th>
                                        <th className="px-6 py-4 text-left text-gray-200">Email</th>
                                        <th className="px-6 py-4 text-left text-gray-200">Chức năng</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-300">
                                    {filteredStudents.map((student, index) => (
                                        <tr key={index} className="hover:bg-indigo-50 transition">
                                            <td className="px-6 py-4">{student.studentId}</td>
                                            <td className="px-6 py-4">{student.fullName}</td>
                                            <td className="px-6 py-4">{student.phone}</td>
                                            <td className="px-6 py-4">{student.email}</td>

                                            <td className="px-6 py-4">
                                                <button
                                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                                    onClick={() => setEditingId(student.studentId)}
                                                >
                                                    Edit
                                                </button>
                                            </td>
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

export default StudentForm;