import { Header, Sidebar, Footer } from "../../components/ui/LecturerUi";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ProjectDetailLecturer() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FCEFE3]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          {/* Group Info */}
          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <div>
                <p className="font-bold">Topic</p>
                <p>Topic name</p>
              </div>
              <div>
                <p className="font-bold">Members</p>
                <div className="flex space-x-2 mt-2">
                  <AccountCircleIcon className="text-red-500 text-4xl" />
                  <AccountCircleIcon className="text-orange-500 text-4xl" />
                  <AccountCircleIcon className="text-purple-500 text-4xl" />
                  <AccountCircleIcon className="text-blue-500 text-4xl" />
                  <AccountCircleIcon className="text-green-500 text-4xl" />
                </div>
              </div>
            </div>

            <p className="font-bold">Major</p>
            <p>Software Engineering</p>

            <p className="font-bold">Lecturer</p>
            <p>Lec123H</p>

            <p className="font-bold">Comment</p>
            <p className="italic text-gray-500">None</p>

            <p className="font-bold">Status</p>
            <p>Pending</p>
          </div>

          {/* Member Details Card */}
          <div className="mt-6 border border-red-400 p-4 w-64 rounded-md">
            <p><span className="font-bold">Student ID:</span> SE183385</p>
            <p><span className="font-bold">Name:</span> Khoa Tran Nguyen Nhat</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex space-x-4">
            <button className="bg-yellow-400 px-4 py-2 rounded-md">Reject</button>
            <button className="bg-green-400 px-4 py-2 rounded-md">Approve</button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
