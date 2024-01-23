const { Router } = require("express");
const pool = require("../db");

const router = Router();

// fetches the description of the candidate corresponding to its id
router.post("/", async (req, res) => {
  try {
    console.log(req.body.id);
    const results = await pool.query(
      "SELECT * FROM candidate_list WHERE id = $1",
      [req.body.id]
    );
    console.log(results.rows[0]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error("Error fetching the required entry:", error);
    res.status(500).send("Internal Server Error");
  }
});

// update candidate status
router.put("/update_status", async (req, res) => {
  try {
    const { id, new_status } = req.body;
    console.log(id, new_status);

    const result = await pool.query(
      "UPDATE candidate_list SET current_status = $1 WHERE id = $2 RETURNING *",
      [new_status, id]
    );

    const updatedEntry = result.rows[0];

    res.json(updatedEntry);
  } catch (error) {
    console.error("Error updating entry:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
