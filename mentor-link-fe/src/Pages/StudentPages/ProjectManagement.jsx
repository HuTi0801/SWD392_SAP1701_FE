import React, { useState, useEffect } from 'react';
import { Header, Sidebar, NotificationPanel, Footer, SidebarButton } from '../../components/ui/StudentUi.jsx';
import { useNavigate } from 'react-router-dom';
import * as projectApi from '../../api/projectApi.js';
import * as lecturerApi from '../../api/lecturerApi.js';
import * as groupApi from '../../api/groupApi.js';  // Add this import
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext.jsx';

const ProjectManagement = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [lecturers, setLecturers] = useState([]);
    const [projectDetails, setProjectDetails] = useState(null);
    const [groupId, setGroupId] = useState(null);

    const fetchAllData = async () => {
        try {
            // Step 1: Get group info
            const groupResponse = await groupApi.getGroupInfoById(auth?.result?.accountId, auth?.result?.token);
            const currentGroupId = groupResponse.result.group.id;
            setGroupId(currentGroupId);

            // Step 2: Get all projects and find matching one
            const allProjectsResponse = await projectApi.getAllProjectsLecturer();
            const userProject = allProjectsResponse.result.find(project => 
                project.group === currentGroupId
            );

            if (userProject) {
                // Step 3: Get detailed project info
                const projectResponse = await projectApi.getProjectLecturer(userProject.id, auth?.result?.token);
                setProjectDetails(projectResponse.result);
            }

            // Fetch lecturers
            const lecturersData = await lecturerApi.lecturerGetAll();
            setLecturers(lecturersData);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch data');
        }
    };

    useEffect(() => {
        if (auth?.result?.token) {
            fetchAllData();
        }
    }, [auth?.result?.token]);

    const initialValues = {
        groupId: groupId || '',
        topicName: '',
        description: '',
        lecturerId: '',
        requesterUserCode: auth?.result?.userCode || ''
    };

    // Add this custom reset handler
    const handleReset = (resetForm) => {
        resetForm({
            values: {
                ...initialValues,
                topicName: '',
                description: '',
                lecturerId: ''
            }
        });
    };

    const validationSchema = Yup.object({
        topicName: Yup.string().required('Topic name is required'),
        description: Yup.string().required('Description is required'),
        lecturerId: Yup.string().required('Lecturer is required')
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await projectApi.projectCreate(
                values.groupId,
                values.topicName,
                values.description,
                values.lecturerId,
                values.requesterUserCode
            );
            console.log(response.statusCode);
            
            switch (response.status) {
                case 200:
                case 201:
                    toast.success(`${response.message || 'Project created successfully'} (Code: ${response.statusCode})`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    resetForm();
                    break;
                case 400:
                    toast.error(`Project already exists for this group (Code: ${response.statusCode})`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    break;
                case 404:
                    toast.error(`Group not found (Code: ${response.statusCode})`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    break;
                default:
                    toast.warning(`${response.message || 'Warning'} (Code: ${response.statusCode})`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
            }
            setSubmitting(false);
        } catch (error) {
            toast.error(`Error: ${error.message || 'Unknown error'} (Code: ${error.status || 500})`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-orange-50">
            <ToastContainer />
            <Header />
            <div className="flex h-[calc(100vh-60px)]">
                <Sidebar />
                <div className="flex-1 p-6">
                    <h1 className="text-3xl font-bold text-center mb-6">My Capstone Project</h1>
                    <div className="grid grid-cols-2 gap-6">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize={true}
                        >
                            {({ isSubmitting, resetForm, errors, touched }) => (
                                <Form className="p-10 border border-orange-300 bg-white rounded-lg space-y-15">
                                    <FormRow label="Topic" error="topicName">
                                        <Field
                                            type="text"
                                            name="topicName"
                                            placeholder="Enter your topic"
                                            className={`w-full bg-orange-100 p-3 rounded placeholder-gray-500 ${errors.topicName && touched.topicName ? 'border-red-500 border' : ''
                                                }`}
                                        />
                                    </FormRow>

                                    <FormRow label="Description" error="description">
                                        <Field
                                            as="textarea"
                                            name="description"
                                            className={`w-full bg-orange-100 p-2 rounded h-40 placeholder-gray-500 ${errors.description && touched.description ? 'border-red-500 border' : ''
                                                }`}
                                            placeholder="A short description"
                                        />
                                    </FormRow>

                                    <FormRow label="Lecturer" error="lecturerId">
                                        <Field
                                            as="select"
                                            name="lecturerId"
                                            className={`w-full bg-orange-100 p-2 rounded ${errors.lecturerId && touched.lecturerId ? 'border-red-500 border' : ''}`}
                                        >
                                            <option value="">Choose a lecturer</option>
                                            {lecturers.map(lecturer => (
                                                <option key={lecturer.id} value={lecturer.id}>
                                                    {lecturer.fullName}
                                                </option>
                                            ))}
                                        </Field>
                                    </FormRow>

                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            onClick={() => handleReset(resetForm)}
                                            className="px-6 py-2 bg-white border rounded cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                            Clear
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-6 py-2 text-white rounded cursor-pointer bg-orange-500 hover:bg-orange-600 transition-colors"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                        <div className="flex flex-col justify-between h-full">
                            <div className="flex flex-col gap-8">
                                <div className="p-10 border border-orange-300 bg-white rounded-lg">
                                    <div className="space-y-12">
                                        <StatusRow label="Project Status">
                                            <span className="bg-green-300 px-4 py-1 rounded">
                                                {projectDetails?.projectStatus || 'N/A'}
                                            </span>
                                        </StatusRow>

                                        <StatusRow label="Assigned Lecturer">
                                            <span className="font-bold">
                                                {projectDetails ? 
                                                    lecturers.find(l => l.id === projectDetails.lecturer)?.fullName || 'Unknown'
                                                    : 'N/A'
                                                }
                                            </span>
                                        </StatusRow>
                                    </div>
                                </div>

                                <div className="p-7 border border-orange-300 bg-white rounded-lg">
                                    <h3 className="font-bold mb-8">Project Progress</h3>
                                    <div className="flex items-center space-x-2 mt-4">
                                        <span className="text-orange-500 font-bold">20%</span>
                                        <div className="w-full bg-orange-200 h-2 rounded">
                                            <div className="bg-orange-500 h-2 rounded" style={{ width: '20%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button 
                                className="w-full py-2 bg-green-300 rounded font-bold mt-6 cursor-pointer hover:bg-green-400 transition-colors" 
                                onClick={() => navigate("/project-details")}
                            >
                                Project Details
                            </button>
                        </div>
                    </div>
                </div>
                <NotificationPanel />
            </div>
            <Footer />
        </div>
    );
};

const FormRow = ({ label, children, error }) => (
    <div>
        <label className="font-bold block mb-1">{label}</label>
        {children}
        {error && (
            <ErrorMessage
                name={error}
                render={msg => <div className="text-red-500 text-sm mt-1">{msg}</div>}
            />
        )}
    </div>
);

const StatusRow = ({ label, children }) => (
    <div className="flex justify-between items-center">
        <span className="font-bold">{label}</span>
        {children}
    </div>
);

export default ProjectManagement;