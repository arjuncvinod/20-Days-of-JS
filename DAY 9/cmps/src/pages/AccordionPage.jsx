import Accordion from '../components/Accordion'


function AccordionPage() {
  const items = [
  {
    id:"123tff",
    label:"Can i use react on a project",
    content:"you can use react on any project you want you can use react on any project you want you can use react on any project you want you can use react on any project you want"
  },
  {
    id:"1jkl3tff",
    label:"Can i use Js a project",
    content:"you can js react on any project you want you can use react on any project you want you can use react on any project you want you can use react on any project you want"
  },
  {
    id:"1ff3tff",
   label:"Can i use CSS on a project",
  content:"you can use js on any project you want you can use react on any project you want you can use react on any project you want you can use react on any project you want"
  }
]
 return(
  <div>
  <Accordion items={items} />
 </div>
 )
}

export default AccordionPage
