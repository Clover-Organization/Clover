import { useTheme } from "@/components/theme-provider"
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Navbar from "@/pages/components/Navbar"
import AsideNavDocs from "../asideNav/AsideNavDocs"

const Structure = () => {
    const { theme } = useTheme();
    const selected = 2;
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Navbar />
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Docs</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <AsideNavDocs selected={selected}/>
                    <div className="grid">
                        <CardHeader>
                            <CardTitle>Structure</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-lg">
                                The Clover project has been meticulously crafted with carefully selected technologies to ensure that the software is robust and comprehensive, while still maintaining the ease of use we aim to achieve. Each technology chosen has been strategically considered to meet the project's needs and those of its users. The judicious selection of technologies reflects our commitment to providing a solution that is reliable, powerful, and, at the same time, accessible and intuitive for our users.
                            </CardDescription>

                            <div className="flex gap-10 mb-6">

                                <div className="grid place-items-center gap-5">
                                    <CardDescription className="mt-6">
                                        <CardTitle>React</CardTitle>
                                    </CardDescription>
                                    <img src={`https://skillicons.dev/icons?i=react&theme=${theme}`} alt="react" width={120} />
                                </div>
                                <div className="grid place-items-center gap-5">
                                    <CardDescription className="mt-6">
                                        <CardTitle>Vite</CardTitle>
                                    </CardDescription>
                                    <img src={`https://skillicons.dev/icons?i=vite&theme=${theme}`} alt="vite" width={120} />
                                </div>
                            </div>

                            <CardDescription className="text-lg ">
                                One of the pivotal decisions we made was to adopt React + Vite. This choice was driven by our pursuit of a development stack that seamlessly blends speed, simplicity, and efficiency, all essential ingredients for realizing our vision. React's component-based architecture empowers us to build modular and reusable UI elements, promoting code clarity and maintainability. Meanwhile, Vite's lightning-fast development server and build tooling optimize the development workflow, allowing for rapid iteration and deployment cycles. Together, React + Vite form a dynamic duo that not only meets but exceeds our expectations, enabling us to transform our ideas into reality with unparalleled agility and effectiveness.
                            </CardDescription>

                            <div className="flex gap-10 mb-6">

                                <div className="grid place-items-center gap-5">
                                    <CardDescription className="mt-6">
                                        <CardTitle>Java</CardTitle>
                                    </CardDescription>
                                    <img src={`https://skillicons.dev/icons?i=java&theme=${theme}`} alt="java" width={120} />
                                </div>
                                <div className="grid place-items-center gap-5">
                                    <CardDescription className="mt-6">
                                        <CardTitle>Spring</CardTitle>
                                    </CardDescription>
                                    <img src={`https://skillicons.dev/icons?i=spring&theme=${theme}`} alt="spring" width={120} />
                                </div>
                            </div>

                            <CardDescription className="text-lg ">
                                Java + Spring stands as a cornerstone in our technology stack, meticulously chosen to embody the virtues of reliability, scalability, and developer productivity. Java, with its robustness and cross-platform compatibility, forms the bedrock of our backend infrastructure. Its mature ecosystem and extensive libraries empower us to tackle complex business logic with confidence, ensuring the stability and longevity of our applications.
                            </CardDescription>
                            <CardDescription className="text-lg mt-6">
                                Complementing Java, Spring Framework emerges as a catalyst for rapid and efficient development. Its dependency injection, aspect-oriented programming, and comprehensive support for enterprise features streamline the development process, fostering code modularity, testability, and maintainability. With Spring Boot, our development journey is further expedited, providing out-of-the-box solutions for common tasks such as auto-configuration, embedded servers, and production-ready deployments.
                            </CardDescription>
                            <CardDescription className="text-lg mt-6">
                                Together, Java + Spring epitomize a symbiotic relationship that harmonizes the power of Java with the productivity of the Spring ecosystem. This synergy not only empowers us to build robust and scalable applications but also enables us to navigate the ever-evolving landscape of enterprise software development with agility and confidence.
                            </CardDescription>

                            <div className="flex gap-10 mb-6">

                                <div className="grid place-items-center gap-5">
                                    <CardDescription className="mt-6">
                                        <CardTitle>MongoDB</CardTitle>
                                    </CardDescription>
                                    <img src={`https://skillicons.dev/icons?i=mongo&theme=${theme}`} alt="mongoDB" width={120} />
                                </div>
                            </div>

                            <CardDescription className="text-lg ">
                                MongoDB, embraced as a pivotal component in our technology arsenal, embodies the principles of flexibility, scalability, and adaptability. As a NoSQL database, MongoDB shatters traditional relational database paradigms, offering a schema-less architecture that liberates developers from the constraints of rigid data models.
                            </CardDescription>
                            <CardDescription className="text-lg mt-6">
                                At the core of MongoDB lies its document-oriented nature, where data is stored in flexible, JSON-like documents. This schema flexibility empowers us to iterate rapidly, accommodating evolving data structures and requirements without the need for complex migrations.
                            </CardDescription>
                            <CardDescription className="text-lg mt-6">
                                Furthermore, MongoDB's distributed architecture facilitates seamless scalability, enabling us to effortlessly scale our database horizontally to handle growing workloads and spikes in demand. Its built-in replication and sharding capabilities ensure high availability and fault tolerance, safeguarding our data against potential failures.
                            </CardDescription>
                        </CardContent>
                    </div>
                </div>
            </main>
        </div>
    )

}

export default Structure;