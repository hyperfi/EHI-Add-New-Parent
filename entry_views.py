from flask import jsonify, render_template, render_template_string, request, send_file
from extentions import db


def create_entery_view(app):

    @app.route('/')
    def home():
        return render_template('index.html')

    @app.route('/api/entry', methods=['POST'])
    def add_entry():
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        # Process the data as needed
        entry = data.get('entry')
        print(entry)
        # Validate the entry
        if not entry:
            return jsonify({"error": "No entry provided"}), 400

        # For example, you might want to save it to the database
        db.session.add(entry)
        db.session.commit()
        return jsonify({"message": "Entry added successfully"}), 201
