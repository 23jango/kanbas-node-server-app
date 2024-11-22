import * as enrollmentDao from "./dao.js";
export default function EnrollmentsRoutes(app) {

//to get enrollments
app.get("/api/enrollments/:userId", (req, res) => {
  const { userId } = req.params;
  const enrollments = enrollmentDao.getEnrollmentsForUser(userId);
  res.status(200).send(enrollments);
});

}