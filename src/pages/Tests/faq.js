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

// @mui material components

// Otis Kit PRO components

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout"
import View from "./view"

// HelpCenter page components

// Faq page code

function Faq() {
  return (
    <BaseLayout
      title="FAQ"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/page-sections/faq" },
        { label: "Faq" },
      ]}
    >
      <View title="Faq">
        <p>hello</p>
      </View>
    </BaseLayout>
  )
}

export default Faq
