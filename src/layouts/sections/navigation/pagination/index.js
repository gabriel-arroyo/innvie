/*
=========================================================
* Otis Kit PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-kit-pro-material-kit-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Otis Kit PRO components
import MKBox from "components/MKBox"

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout"
import View from "layouts/sections/components/View"

// Stats page components
import PaginationSimple from "layouts/sections/navigation/pagination/components/PaginationSimple"
import PaginationSizing from "layouts/sections/navigation/pagination/components/PaginationSizing"
import PaginationVariants from "layouts/sections/navigation/pagination/components/PaginationVariants"

// Stats page components code
import paginationSimpleCode from "layouts/sections/navigation/pagination/components/PaginationSimple/code"
import paginationSizingCode from "layouts/sections/navigation/pagination/components/PaginationSizing/code"
import paginationVariantsCode from "layouts/sections/navigation/pagination/components/PaginationVariants/code"

function Pagination() {
  return (
    <BaseLayout
      title="Pagination"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/navigation/pagination" },
        { label: "Pagination" },
      ]}
    >
      <View title="Pagination simple" code={paginationSimpleCode}>
        <MKBox py={3}>
          <PaginationSimple />
        </MKBox>
      </View>
      <View title="Pagination sizing" code={paginationSizingCode}>
        <MKBox p={3}>
          <PaginationSizing />
        </MKBox>
      </View>
      <View title="Pagination Variant" code={paginationVariantsCode}>
        <MKBox p={3}>
          <PaginationVariants />
        </MKBox>
      </View>
    </BaseLayout>
  )
}

export default Pagination
