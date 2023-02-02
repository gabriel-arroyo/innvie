import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import PropTypes from "prop-types"

export default function SectionTitle({ title }) {
  return (
    <MKBox
      variant="gradient"
      bgColor="primary"
      borderRadius="lg"
      coloredShadow="primary"
      mx={2}
      mt={-3}
      p={3}
      mb={1}
      textAlign="center"
    >
      <MKTypography display="block" variant="button" color="white" my={1}>
        {title}
      </MKTypography>
    </MKBox>
  )
}

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
}
