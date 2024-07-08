import uiDesign from "@/assets/images/ui-design.png"
import webDesign from "@/assets/images/web_design.png"

export const configStyleComponent = {
    Button: {
        colorPrimary: '#50c297',
        contentFontSize: 16,
        controlHeight: 44,
        colorPrimaryHover: "#50c297",
        colorPrimaryActive: "#50c297"
      },

      Input: {
        algorithm: true, // Enable algorithmrderColor: '#50c297',
        paddingBlock: 7,
        hoverBorderColor: "#50c297",
        colorPrimaryActive: "#50c297",
        colorPrimary: '#50c297'
      }
}

export enum CATEGORY {
  HTML_CSS = 3,
  JAVASCRIPT = 2,
  REACTJS = 1,
}

export const Roles = [
  {
    image: uiDesign,
    title: 'UI Design',
    description: 'Amela'
  },
  {
    image: webDesign,
    title: 'Frontend web',
    description: ''
  }
]