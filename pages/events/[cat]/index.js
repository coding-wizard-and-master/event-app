import CatEvent from '@/src/components/events/catEvent';

const EventsCatPage = ({ data, pageName }) => {
    return (
        <CatEvent data={data} pageName={pageName} />
    )
}

export default EventsCatPage;

export async function getStaticPaths() {
    const { events_categories } = await import('/data/data.json')
    const allPaths = events_categories.map(event => {
        return {
                params: {
                    cat: event.id.toString(),
                },
            }
    });
    console.log(allPaths);
    return {
        paths: allPaths,
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const id = context?.params.cat;
    const { allEvents } = await import('/data/data.json')
    const data = allEvents.filter(event => event.city === id)
    return {
        props: { data, pageName: id }
    }
}