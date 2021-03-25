import PrivateLayout from '../../layouts/PrivateLayout';
import React, { useState } from "react";
import styles from './Index.module.scss'

export default function PostComponent() {
  const [subjects, setSubjects] = useState([
    { name: "Đảm bảo chất lượng phần mềm ", id: 1 },
    { name: "Quản lý dự án ", id: 2 },
    { name: "Lập trình hướng đối tượng ", id: 3 },
    { name: "Các hệ thống phân tán", id: 4 }
  ])
  return (
    <PrivateLayout>
      <div className={styles.content} >
        <div className={styles.listSubject}>
          <p className={styles.title}>Danh sách môn học</p>
          <div className={styles.tableSubject}>
            {
              subjects.map((item) => (
                <p className={styles.subject}>{item.name}</p>
              ))
            }
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
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
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PrivateLayout>
  );
}
