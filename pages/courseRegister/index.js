import PrivateLayout from "../../layouts/PrivateLayout";
import React, { useState } from "react";
import styles from "./Index.module.scss";

export default function PostComponent() {
  const [subjects, setSubjects] = useState([
    { name: "Đảm bảo chất lượng phần mềm ", id: 1 },
    { name: "Quản lý dự án ", id: 2 },
    { name: "Lập trình hướng đối tượng ", id: 3 },
    { name: "Các hệ thống phân tán", id: 4 },
  ]);
  return (
    <PrivateLayout>
      <div className={styles.content}>
        <div className={styles.listSubject}>
          <p className={styles.title}>Danh sách môn học</p>
          <div className={styles.tableSubject}>
            {subjects.map((item, index) => (
              <p className={styles.subject} key={index}>
                {item.name}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.listRoom}>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Mã môn học</th>
                <th>Tên môn học</th>
                <th>Nhóm môn học</th>
                <th>Số tín chỉ</th>
                <th>Mã lớp</th>
                <th>Thứ</th>
                <th>Tiết bắt đầu</th>
                <th> Tuần</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((item, index) => (
                <tr className={styles.td} key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>0001</td>
                  <td>03</td>
                  <td>03</td>
                  <td>03</td>
                  <td>B17dccn594</td>
                  <td>thứ 6</td>
                  <td>tiết 4</td>
                  <td>tuần 3</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

          <p className={styles.titleRegister}>Danh sách môn học đã đăng ký</p>
        <div className={styles.listRoom}>
          <div className={styles.tableRegister}>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Mã môn học</th>
                <th>Tên môn học</th>
                <th>Nhóm môn học</th>
                <th>Số tín chỉ</th>
                <th>Mã lớp</th>
                <th>Thứ</th>
                <th>Tiết bắt đầu</th>
                <th> Tuần</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((item, index) => (
                <tr className={styles.td} key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>0001</td>
                  <td>03</td>
                  <td>03</td>
                  <td>03</td>
                  <td>B17dccn594</td>
                  <td>thứ 6</td>
                  <td>tiết 4</td>
                  <td>tuần 3</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </PrivateLayout>
  );
}
