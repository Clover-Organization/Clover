import { Button } from "@/components/ui/button";
import ProjectDescription from "@/pages/projects/components/projectTitleDescription/ProjectDescription";
import { Search, Share2 } from "lucide-react";

const ProjectPreview = () => {

    const singleRequest = "";
    const commitsRequest = "";
    return (
        <main className="main-project-content">
            <article className="article-project-content">
                <section className="section-project-description">
                    <div className="projectFiles">
                        <>
                            <div className="titleProject">
                                <nav className="nav-project">
                                    <h2>{singleRequest && singleRequest.projectName}</h2>
                                    <div className="align-nav-components">
                                        <div className="lupaSearch-projects">
                                            <div className="lupa"><Search width={20} /></div>
                                            <input
                                                className="bg-secondary"
                                                title="Search"
                                                placeholder="Search.."
                                                type="search"
                                                id="filter"

                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" >Upload</Button>
                                            <Button variant="outline" size="icon" >
                                                <Share2 width={18} />
                                            </Button>
                                        </div>
                                    </div>
                                </nav>
                                <hr className="hr-project-title" />
                            </div>

                            <div className="projects-files-content">
                            </div>

                        </>
                    </div>
                    <ProjectDescription
                        singleRequest={singleRequest}
                        commitsRequest={commitsRequest}
                    />
                </section>
            </article>
        </main>
    )
}


export default ProjectPreview;