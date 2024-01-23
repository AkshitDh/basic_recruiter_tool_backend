const { Router } = require("express");
const pool = require("../db");

const router = Router();

// fetches the entire list of candidates from the database
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, score, current_status FROM candidate_list"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error updating entry:", error);
    res.status(500).send("Internal Server Error");
  }
});

// adds a new candidate to the list
router.post("/add_user", async (req, res) => {
  try {
    console.log(req.body);

    const result = await pool.query(
      "INSERT INTO candidate_list (name, email, phone_number, score, additional_skills, current_status, expected_salary, experience_with_node, experience_with_react) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        req.body.name,
        req.body.email,
        req.body.phone_number,
        req.body.score,
        req.body.additional_skills,
        req.body.current_status,
        req.body.expected_salary,
        req.body.experience_with_node,
        req.body.experience_with_react,
      ]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding candidate:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
