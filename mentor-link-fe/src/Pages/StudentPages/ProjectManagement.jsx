import React from 'react';
import { Header, Sidebar, NotificationPanel, Footer, SidebarButton } from '../../components/ui/StudentUi.jsx';
import { useNavigate } from 'react-router-dom';
import * as projectApi from '../../api/projectApi.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProjectManagement = () => {
    const navigate = useNavigate();

    const initialValues = {
        groupId: '3',
        topicName: '',
        description: '',
        lecturerId: '',
        requesterUserCode: 'SS100013'
    };

    const validationSchema = Yup.object({
        topicName: Yup.string().required('Topic name is required'),
        description: Yup.string().required('Description is required'),
        lecturerId: Yup.string().required('Lecturer is required')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await projectApi.projectCreate(
                values.groupId,
                values.topicName,
                values.description,
                values.lecturerId,
                values.requesterUserCode
            );
            console.log('Project created:', response);
            setSubmitting(false);
        } catch (error) {
            console.error('Failed to create project:', error);
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-orange-50">
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
                        >
                            {({ isSubmitting, resetForm, errors, touched }) => (
                                <Form className="p-10 border border-orange-300 bg-white rounded-lg space-y-8">
                                    <FormRow label="Topic" error="topicName">
                                        <Field
                                            type="text"
                                            name="topicName"
                                            placeholder="Enter your topic"
                                            className={`w-full bg-orange-100 p-3 rounded placeholder-gray-500 ${
                                                errors.topicName && touched.topicName ? 'border-red-500 border' : ''
                                            }`}
                                        />
                                    </FormRow>

                                    <FormRow label="Major">
                                        <Field as="select" className="w-full bg-orange-100 p-2 rounded">
                                            <option>Choose a major</option>
                                            <option>Software Engineering</option>
                                            <option>Graphics Design</option>
                                            <option>Marketing</option>
                                        </Field>
                                    </FormRow>

                                    <FormRow label="Description" error="description">
                                        <Field
                                            as="textarea"
                                            name="description"
                                            className={`w-full bg-orange-100 p-2 rounded h-40 placeholder-gray-500 ${
                                                errors.description && touched.description ? 'border-red-500 border' : ''
                                            }`}
                                            placeholder="A short description"
                                        />
                                    </FormRow>

                                    <FormRow label="Lecturer" error="lecturerId">
                                        <Field
                                            as="select"
                                            name="lecturerId"
                                            className={`w-full bg-orange-100 p-2 rounded ${
                                                errors.lecturerId && touched.lecturerId ? 'border-red-500 border' : ''
                                            }`}
                                        >
                                            <option value="">Choose a lecturer</option>
                                            <option value="1">Dr. Sarah Johnson</option>
                                            <option value="2">Prof. Michael Chen</option>
                                            <option value="3">Dr. Emily Rodriguez</option>
                                        </Field>
                                    </FormRow>

                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            onClick={() => resetForm()}
                                            className="px-4 py-2 bg-white border rounded cursor-pointer"
                                        >
                                            Clear
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-4 py-2 bg-gray-500 text-white rounded cursor-pointer"
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
                                        <StatusRow label="Proposal Status">
                                            <span className="bg-green-300 px-4 py-1 rounded">Approved</span>
                                        </StatusRow>

                                        <StatusRow label="Assigned Lecturer">
                                            <span className="font-bold">Mr. Hoang Nguyen The</span>
                                        </StatusRow>

                                        <StatusRow label="Comment">
                                            <span className="bg-green-300 px-4 py-1 rounded">Your project has already been approved</span>
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

                            <button className="w-full py-2 bg-green-300 rounded font-bold mt-6 cursor-pointer" onClick={() => navigate("/project-details")}>Project Details</button>
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