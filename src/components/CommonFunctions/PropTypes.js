import PropTypes from 'prop-types';

const alltypes = {
    ParticipantComponent: {
        participants: PropTypes.objectOf(
            PropTypes.shape({
                availability: PropTypes.string,
                country: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                dob: PropTypes.string.isRequired,
                docs: PropTypes.object.isRequired,
                email: PropTypes.string.isRequired,
                ethnicities: PropTypes.string.isRequired,
                facialHair: PropTypes.number.isRequired,
                firstName: PropTypes.string.isRequired,
                gender: PropTypes.number.isRequired,
                hairColor: PropTypes.number.isRequired,
                hairLength: PropTypes.number.isRequired,
                hairType: PropTypes.number.isRequired,
                healthConditions: PropTypes.string.isRequired,
                heightFt: PropTypes.number.isRequired,
                heightIn: PropTypes.number.isRequired,
                industry: PropTypes.number.isRequired,
                interestedInRecruiting: PropTypes.bool,
                lastName: PropTypes.string.isRequired,
                otherCompanies: PropTypes.string.isRequired,
                phone: PropTypes.string.isRequired,
                piercings: PropTypes.string.isRequired,
                registeredAs: PropTypes.number.isRequired,
                residenceCity: PropTypes.string.isRequired,
                residenceState: PropTypes.number.isRequired,
                skintone: PropTypes.number.isRequired,
                source: PropTypes.number.isRequired,
                tattoos: PropTypes.string.isRequired,
            })).isRequired,
        setShownParticipants: PropTypes.func.isRequired
    }

};

export default alltypes;