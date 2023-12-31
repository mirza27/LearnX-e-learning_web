import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/eventDetail.css";

interface EventProps {
  is_lecturer: boolean;
}
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function AnnouncementPage(props: EventProps) {
  const location = useLocation();
  const event_id = location.state && location.state.event_id;
  const navigate = useNavigate();
  const { is_lecturer } = props;
  const [message, setMessage] = useState("");
  const [announcementData, setAnnouncementData] = useState<any>(null);

  const GetEventData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/event/announcement/${event_id}`,
        {}
      );
      setAnnouncementData(response.data);

      if (response.data.message) {
        setMessage(response.data.message);
      }
    } catch (error: any) {
      if (error.response) {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });
      }
    }
  };

  useEffect(() => {
    if (is_lecturer || !is_lecturer) {
      GetEventData();
    }
  }, [is_lecturer]);

  if (is_lecturer == true) {
    // if lecturer
    return (
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Announcement</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>
                <i className="bx bx-chevron-right"></i>
              </li>
              <li>
                <a className="" href="#">
                  My Class
                </a>
              </li>
              <li>
                <i className="bx bx-chevron-right"></i>
              </li>
              <li>
                <a className="" href="#">
                  Content
                </a>
              </li>
              <li>
                <i className="bx bx-chevron-right"></i>
              </li>
              <li>
                <a className="active" href="#">
                  Announcement
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="task-detail-container">
          {announcementData && (
            <div>
              <h1 className="task-title">{announcementData.event_name}</h1>
              <div className="task-meta">
                <p>
                  Created At :
                  {new Date(announcementData.createdAt).toLocaleString(
                    "en-ID",
                    {
                      dateStyle: "long",
                      timeStyle: "short",
                    }
                  )}
                </p>
              </div>
              {announcementData.announcements &&
              announcementData.announcements.length > 0 ? (
                announcementData.announcements.map((announcement: any) => (
                  <div
                    key={announcement.announcement_id}
                    className="task-content"
                  >
                    {announcement.nama ? (
                      <h2>Announcement : {announcement.nama}</h2>
                    ) : (
                      <h2>Announcement : -</h2>
                    )}
                    {announcement.content ? (
                      <>
                        <p>Content : </p>
                        <p>{announcement.content}</p>
                      </>
                    ) : (
                      <>
                        <p>Content : </p>
                        <p> - </p>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p className="no-task-message">Pengumuman tidak tersedia</p>
              )}
            </div>
          )}
        </div>
      </main>
    );
  } else {
    // jika student
    return (
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Announcement</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>
                <i className="bx bx-chevron-right"></i>
              </li>
              <li>
                <a className="" href="#">
                  Class
                </a>
              </li>
              <li>
                <i className="bx bx-chevron-right"></i>
              </li>
              <li>
                <a className="" href="#">
                  Content
                </a>
              </li>
              <li>
                <i className="bx bx-chevron-right"></i>
              </li>
              <li>
                <a className="active" href="#">
                  Announcement
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="task-detail-container">
          {announcementData && (
            <div>
              <h1 className="task-title">{announcementData.event_name}</h1>
              <div className="task-meta">
                <p>
                  Created At :
                  {new Date(announcementData.createdAt).toLocaleString(
                    "en-ID",
                    {
                      dateStyle: "long",
                      timeStyle: "short",
                    }
                  )}
                </p>
              </div>
              {announcementData.announcements &&
              announcementData.announcements.length > 0 ? (
                announcementData.announcements.map((announcement: any) => (
                  <div
                    key={announcement.announcement_id}
                    className="task-content"
                  >
                    {announcement.nama ? (
                      <h2>Announcement : {announcement.nama}</h2>
                    ) : (
                      <h2>Announcement : -</h2>
                    )}
                    {announcement.content ? (
                      <>
                        <p>Content : </p>
                        <p>{announcement.content}</p>
                      </>
                    ) : (
                      <>
                        <p>Content : </p>
                        <p> - </p>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p className="no-task-message">Pengumuman tidak tersedia</p>
              )}
            </div>
          )}
        </div>
      </main>
    );
  }
}

export default AnnouncementPage;
