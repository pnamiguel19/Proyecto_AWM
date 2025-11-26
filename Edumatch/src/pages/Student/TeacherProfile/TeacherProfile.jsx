import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTeacherById } from '../../../data/mockTeachers';
import TeacherProfileCard from '../../../components/Student/TeacherProfileCard/TeacherProfileCard';
import ActionButtons from '../../../components/Student/ActionButtons/ActionButtons';
import VideoPresentation from '../../../components/Student/VideoPresentation/VideoPresentation';
import CourseCarousel from '../../../components/Student/CourseCarousel/CourseCarousel';
import TeacherReviews from '../../../components/Student/TeacherReviews/TeacherReviews';
import LocationMap from '../../../components/Student/LocationMap/LocationMap';
import './TeacherProfile.css';

const TeacherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const teacherData = getTeacherById(id);

  // Si no se encuentra el profesor, redirigir al home
  if (!teacherData) {
    navigate('/');
    return null;
  }

  return (
    <div className="teacher-profile">
      <div className="teacher-profile__container">
        <button 
          className="teacher-profile__back-button"
          onClick={() => navigate('/')}
        >
          ← Volver al inicio
        </button>
        
        <TeacherProfileCard teacher={teacherData} />
        <ActionButtons teacherId={teacherData.id} />
        <VideoPresentation video={teacherData.video} />
        <CourseCarousel 
          courses={teacherData.courses} 
          teacherModality={teacherData.modality}
          priceVirtual={teacherData.priceVirtual}
          pricePresencial={teacherData.pricePresencial}
        />
        <TeacherReviews 
          reviews={teacherData.reviews}
          rating={teacherData.rating}
          reviewCount={teacherData.reviewCount}
          approvalRate={teacherData.approvalRate}
        />
        <LocationMap location={teacherData.location} />
      </div>
    </div>
  );
};

export default TeacherProfile;