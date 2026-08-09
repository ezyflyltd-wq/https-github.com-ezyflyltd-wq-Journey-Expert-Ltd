# JOURNEY EXPERT LTD. — UNIVERSITY & COURSE DATA MODEL
**Part 52 Execution • Autonomous Engineering System**

---

## 1. Relational Data Model
The University & Course Database powers global search, course comparison, and AI matching:

```
+-------------------------------------------------------------------+
|                           Universities                            |
|  (id, name, country, city, ranking_qs, cricos_code, website)      |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                            Degree Courses                         |
|  (id, university_id, title, level, duration_months, tuition_fee)  |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                         Program Intakes                           |
|  (id, course_id, intake_month, deadline_date, status)             |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                       Admission Criteria                          |
|  (id, course_id, min_gpa, ielts_overall, ielts_min_band, pte_min) |
+-------------------------------------------------------------------+
```

---

## 2. Key Attributes & Search Indexing
- **Search Filters**: Country, City, Degree Level (Bachelor's, Master's, PhD, Diploma), Tuition Fee Range, Intake Month (September/Fall, January/Spring, May/Summer), IELTS/PTE Score.
- **Accreditation & Quality Verification**: Stores official university QS/Times Higher Education rankings where verified, CRICOS registration for Australia, and DLI numbers for Designated Learning Institutions in Canada.
