<h1 align="center">📚 EduCoursera – Online Course Selling Platform</h1>

<p align="center">
  EduCoursera is a full-stack online course selling platform built using 
  <strong>Django (Backend), PostgreSQL (Database), and React (CRA Frontend)</strong>. 
  It includes features like user authentication, course browsing, cart system, Stripe payments, 
  purchased courses, and admin course management.  
  <br><br>
  This guide will help you set up the entire project on your <strong>local machine</strong>.
</p>

<hr>

<h2>🔥 PART 1 — Install Required Components</h2>

<p>Run the following commands to install Python, PostgreSQL, Node, and other required tools:</p>

<pre>
sudo apt update
sudo apt install python3 python3-venv python3-pip postgresql postgresql-contrib nodejs npm
</pre>

<hr>

<h2>🔥 PART 2 — Setup PostgreSQL Database</h2>

<h3>1️⃣ Login to PostgreSQL</h3>

<pre>
sudo -u postgres psql
</pre>

<h3>2️⃣ Create Database & User (inside PostgreSQL shell)</h3>

<pre>
CREATE DATABASE dbname;
CREATE USER user WITH PASSWORD 'yourpassword';
ALTER ROLE user SET client_encoding TO 'utf8';
ALTER ROLE user SET default_transaction_isolation TO 'read committed';
ALTER ROLE user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE dbname TO user;
\q
</pre>

<hr>

<h2>🔥 PART 3 — Backend Setup (Django)</h2>

<h3>1️⃣ Create & Activate Virtual Environment</h3>
<pre>
python3 -m venv venv
source venv/bin/activate
</pre>

<h3>2️⃣ Install Dependencies</h3>
<pre>
pip install -r requirements.txt
</pre>

<h3>3️⃣ Apply Migrations</h3>
<pre>
python manage.py makemigrations
python manage.py migrate
</pre>

<h3>4️⃣ Create Superuser</h3>
<pre>
python manage.py createsuperuser
</pre>

<h3>5️⃣ Run Django Server</h3>
<pre>
python manage.py runserver
</pre>

<p>Backend runs at: <strong>http://localhost:8000</strong></p>

<hr>

<h2>🔥 PART 4 — Stripe Local Setup</h2>

<p>Install Stripe CLI (if not installed):</p>

<pre>
curl -sS https://stripe.com/install.sh | sudo bash
</pre>

<h3>Start Stripe Webhook Listener</h3>

<pre>
stripe listen --forward-to localhost:8000/api/payments/webhook/
</pre>

<p>Make sure your <code>.env</code> contains:</p>

<pre>
STRIPE_SECRET_KEY=your_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
</pre>

<hr>

<h2>🔥 PART 5 — Frontend Setup (React CRA)</h2>

<h3>1️⃣ Install Dependencies</h3>

<pre>
cd frontend
npm install
</pre>

<h3>2️⃣ Start Development Server</h3>

<pre>
npm start
</pre>

<p>CRA frontend runs at: </p>

<pre>
http://localhost:3000
</pre>

<hr>

<h2>🎉 Everything is Ready!</h2>


