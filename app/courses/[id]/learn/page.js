'use client'

import Image from "next/image";

import UnitHeader from "./unitHeader";
import UnitSection from "./unitSection";

const icon = {
    lighter: <Image src="" alt="lighter" width="80" height="80" className="flex-shrink-0 mx-4 w-20 h-20 sm:mx-16 sm:w-24 sm:h-24" />,
}

const course =
    {
        id: 1,
        name: "Thermochimie",
        description: "Apprends à étudier les échanges d'énergie lors de réactions chimiques !",
        department: "stpi",
        icon: 'lighter',
        semester: 2,
        celeneLink: "https://celene.insa-cvl.fr"
    }

const units = [
    {
        index: 1,
        name: "Introduction à la thermochimie",
    },
    {
        index: 2,
        name: "Les grandeurs thermodynamiques",
    }
]

const userCourses =
    {
        userId: 2,
        courseId: 1,
        currentUnitIndex: 0,
        currentUnitCheckpointIndex: 0
    }

export default function page() {

    return (
            units
            .map((unit) => {
                return (
                <UnitSection>
                    <UnitHeader
                        color="purple"
                        unitNumber={unit.index}
                        unitName={unit.name}
                    >
                    </UnitHeader>
                    Les checkpoints là
                </UnitSection>
                );
            }
            )
    );
};