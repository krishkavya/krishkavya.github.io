---
name: update-experience 
description: Fetches the linkedin profile again and checks for any new experience added. Use this when the user asks to update their experience or profile.
---

Goal
To fetch the linkedin profile again and look for any new experience added

Instructions
- Fetch linkedin profile using url 
- Check for experiences that are not present in the current database
- If any new experience is found, add it to index.html. It must be added in the experiences section in the descending order of the dates
- The format for adding the experience is as follows:
```
<li class="timeline-item">
    <div class="timeline-content">
        <h3>Role - Company</h3>
        <span>Month Year – Month Year</span>
        <p>
            Description of responsibilities and achievements. Use strong action verbs and quantify results where possible.
        </p>
    </div>
</li>
```
- First check for the current date of the last added experience in index.html  
- Then check for the experiences after that date in the linkedin profile 
- Add only the experiences that are after the current date