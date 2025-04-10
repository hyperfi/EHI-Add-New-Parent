from flask import jsonify, render_template, render_template_string, request, send_file
from extentions import db
from models import ParentCustomer as parent_customer


def create_entery_view(app):

    @app.route('/')
    def home():
        return render_template('index.html')

    @app.route('/api/entry', methods=['POST'])
    def add_entry():
        data = request.get_json()
        print(data)
        if not data:
            return jsonify({"message": "No data provided"}), 400
        # # Process the data as needed
        found_entry = db.session.query(parent_customer).filter_by(
            parent_contact=data['parentContact']).first()
        print(found_entry)
        if found_entry:
            return jsonify({"message": "Entry already exists"}), 400
        entry = parent_customer(
            parent_name=data['parentName'],
            address=data['address'],
            visiting_date=data['visitingDate'],
            child_name=data['childName'],
            course_enrolled=data['courseEnrolled'],
            parent_contact=data['parentContact'],
        )
        # # For example, you might want to save it to the database
        db.session.add(entry)
        db.session.commit()
        return jsonify({"message": "Entry added successfully"}), 201

    @app.route('/api/entry', methods=['GET'])
    def get_entries():
        entries = parent_customer.query.all()
        data = []
        for entry in entries:
            data.append({
                'id': entry.id,
                'parentName': entry.parent_name,
                'address': entry.address,
                'visitingDate': entry.visiting_date,
                'childName': entry.child_name,
                'courseEnrolled': entry.course_enrolled,
                'parentContact': entry.parent_contact,
            })
        return jsonify(data), 200

    @app.route('/api/entry/<contact>', methods=['DELETE'])
    def delete_entry(contact):
        entry = parent_customer.query.filter_by(parent_contact=contact).first()
        if not entry:
            return jsonify({"message": "Entry not found"}), 404
        db.session.delete(entry)
        db.session.commit()
        return jsonify({"message": "Entry deleted successfully"}), 200
